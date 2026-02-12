/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { SmartWhatsAppCTA } from "@/components/conversion/SmartWhatsAppCTA";
import { VideoTestimonialsSection } from "@/components/testimonials/VideoTestimonialsSection";
import { PricingSection, CostComparisonSection } from "@/components/city";
import { RelatedCityLinks } from "@/components/seo/RelatedCityLinks";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
        id: "0",
        question: "How does NEET score help with US medical school admissions?",
        answer: "NEET demonstrates exceptional science knowledge and commitment. Combined with high AP scores and SATs, it strengthens your medical school application profile significantly."
      },
      {
        id: "1",
        question: "What are the batch timings for New York students?",
        answer: "New York batches: 8 PM - 11 PM IST (10:30 AM - 1:30 PM EST) or 12 AM - 3 AM IST (2:30 PM - 5:30 PM EST previous day)."
      },
      {
        id: "2",
        question: "Can I prepare for both NEET and AP Biology?",
        answer: "Absolutely! NEET biology exceeds AP Bio requirements. Our curriculum covers both with AP questions integrated into NEET modules."
      },
      {
        id: "3",
        question: "Is there Ivy League guidance after NEET?",
        answer: "Yes! We guide on pursuing MD in India, US residency via USMLE path, or DO programs with NEET + AP excellence."
      },
      {
        id: "4",
        question: "What's the success rate for New York students?",
        answer: "98% success with 80+ students securing 600+ marks. Many are now in top AIIMS/CMC/JIPMER colleges with full scholarships."
      },
      {
        id: "5",
        question: "Does the massive Indian community help with NEET prep?",
        answer: "Absolutely! 200,000+ Indians in NYC means incredible peer support, mentorship from doctors, and monthly community events."
      }
];

export function PageContent() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Coaching in New York, USA
          </h1>
          <p className="text-xl mb-6 text-blue-100">
            Expert NEET preparation with 98% success rate. Dr. Shekhar C Singh's proven methodology.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20I%20want%20to%20know%20about%20NEET%20coaching%20in%20New%20York"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              WhatsApp Now
            </a>
            <a
              href="tel:+918826444334"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
            >
              Call +918826444334
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-700 mt-2">Success Rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">600+</div>
              <div className="text-gray-700 mt-2">Avg. NEET Score</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-700 mt-2">Students in AIIMS</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">200,000</div>
              <div className="text-gray-700 mt-2">Indian Community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Cerebrum for New York?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Expert Mentorship</h3>
              <p className="text-gray-700">
                Learn directly from Dr. Shekhar C Singh with 20+ years of medical education expertise.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Localized Curriculum</h3>
              <p className="text-gray-700">
                New York-specific content aligned with local education boards and timezone optimization.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-700">
                Join a vibrant New York community of NEET aspirants with peer mentorship and study groups.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-700">
                Multiple batch timings optimized for EST/EDT timezone to fit your local schedule.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Online + Offline</h3>
              <p className="text-gray-700">
                Hybrid learning model with online classes and occasional in-person study marathons.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Career Guidance</h3>
              <p className="text-gray-700">
                Post-NEET pathway planning for India, USA, Canada, UK, or Australia medical careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Class Timings Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Class Timings for New York</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Morning Batch</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">IST:</span> 7 AM - 10 AM
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Local EST/EDT:</span> See meta timings
              </p>
              <p className="text-gray-600 mt-4">Ideal for students with evening commitments</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Evening Batch</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">IST:</span> 6 PM - 9 PM
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Local EST/EDT:</span> See meta timings
              </p>
              <p className="text-gray-600 mt-4">Perfect for students balancing school/college</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Schools in City */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Schools in New York</h2>
          <p className="text-center text-gray-600 mb-8">
            Many students from these prestigious institutions join our NEET coaching:
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li key="0">Trinity School</li>
                  <li key="1">Dalton School</li>
                  <li key="2">Chapin School</li>
                  <li key="3">Collegiate School</li>
                  <li key="4">Poly Prep Country Day School</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Student Success Stories</h2>
          <VideoTestimonialsSection />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Pricing Plans</h2>
          <PricingSection />
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Cerebrum is Most Affordable?</h2>
          <CostComparisonSection />
        </div>
      </section>

      {/* WhatsApp CTA 2 */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <SmartWhatsAppCTA 
            title="Still Have Questions?" 
            message="Chat with our counselors on WhatsApp for instant guidance"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions - New York
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                  className="w-full px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 flex justify-between items-center"
                >
                  {item.question}
                  <span className="text-blue-600">{expandedFaq === item.id ? "-" : "+"}</span>
                </button>
                {expandedFaq === item.id && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA 3 */}
      <section className="py-8 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <SmartWhatsAppCTA 
            title="Ready to Start Your NEET Journey?" 
            message="Book your free counseling session now"
            variant="highlight"
          />
        </div>
      </section>

      {/* Related Cities */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">NEET Coaching in Other Cities</h2>
          <RelatedCityLinks currentCity="neet-coaching-new-york-usa" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Successful NEET Students
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your preparation with India's most trusted NEET coaching. Limited seats available in New York batch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20interested%20in%20New%20York%20batch"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Chat on WhatsApp
            </a>
            <a
              href="tel:+918826444334"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
