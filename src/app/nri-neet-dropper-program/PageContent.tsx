import { SmartWhatsAppCTA } from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';

const stats = ["78% students improve by 150+ marks", "92% qualify for NRI quota", "\u20b945,000 - \u20b995,000 pricing", "2x daily doubt sessions"];

export function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NRI NEET Dropper Program</h1>
          <p className="text-xl mb-6 opacity-90">Specialized dropper program for NRI students who scored 300-550 in NEET and need 600+ for NRI quota. 10-12 months intensive coaching.</p>
          <div className="flex gap-4 flex-wrap">
            <SmartWhatsAppCTA 
              message="Know more about NRI NEET Dropper Program"
              buttonText="Get Free Consultation"
              className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
              Schedule Call
            </button>
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
            <p className="text-lg text-gray-700 mb-4"><strong>Target Audience:</strong> Students who scored 300-550 in NEET but need 600+ for NRI quota</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Program Duration:</strong> 10-12 months intensive</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Gap analysis based on previous NEET attempt</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Personalized study plan tailored to weak areas</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">2x daily doubt sessions with expert faculty</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Weekly mock tests matching NEET pattern</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Flexible timings for all timezones</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">One-on-one mentoring sessions</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Program Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Basic</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹45,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">12-month access</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Study materials</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Monthly doubt sessions</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI NEET Dropper Program - Basic"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Advanced</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹65,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">All Basic features</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">2x daily doubt sessions</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Weekly mock tests</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Personalized feedback</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI NEET Dropper Program - Advanced"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Premium+Mentoring</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹95,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">All Advanced features</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Weekly 1-on-1 mentoring</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Gap analysis report</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Success guarantee support</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI NEET Dropper Program - Premium+Mentoring"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                
          </div>
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
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Why Choose Cerebrum Biology Academy?</h2>
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
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-700 font-bold">NRI Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <VideoTestimonialsSection />
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">How much improvement can I expect as a dropper student?</h3>
                  <p className="text-gray-700 leading-relaxed">On average, our dropper students improve by 150-200 marks. 78% of our students achieve this improvement.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Is this program suitable for NRI students in different timezones?</h3>
                  <p className="text-gray-700 leading-relaxed">Yes! We offer flexible timings with recorded sessions available 24/7.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">What score improvement is needed for NRI quota?</h3>
                  <p className="text-gray-700 leading-relaxed">Most NRI quota seats require 600+ marks. 92% of our dropper students qualify for NRI quota.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">How do you personalize the study plan for each student?</h3>
                  <p className="text-gray-700 leading-relaxed">We conduct a comprehensive gap analysis of your NEET exam performance.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">What if I have limited time before the next NEET?</h3>
                  <p className="text-gray-700 leading-relaxed">Our flexible 10-12 month program can be compressed based on your timeline.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Are mock tests included, and how frequent are they?</h3>
                  <p className="text-gray-700 leading-relaxed">Yes, weekly mock tests matching the exact NEET pattern are included.</p>
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
          <p className="text-xl mb-8 opacity-90">Start your journey with Cerebrum Biology Academy today</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <SmartWhatsAppCTA 
              message="Enroll in NRI NEET Dropper Program"
              buttonText="Enroll Now"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
            />
            <a href="tel:+918826444334" className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold inline-block">
              Call: +918826444334
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
