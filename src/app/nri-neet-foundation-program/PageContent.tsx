import { SmartWhatsAppCTA } from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';

const stats = ["Students start early score 50-80 marks higher", "NCERT foundation with NEET alignment", "\u20b918,000 - \u20b935,000 annual pricing", "Progressive concept building"];

export function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NRI NEET Foundation Program</h1>
          <p className="text-xl mb-6 opacity-90">Early preparation program for Class 9-10 NRI students planning for NEET. Build strong biological concepts.</p>
          <div className="flex gap-4 flex-wrap">
            <SmartWhatsAppCTA 
              message="Know more about NRI NEET Foundation Program"
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
            <p className="text-lg text-gray-700 mb-4"><strong>Target Audience:</strong> Class 9-10 NRI students planning for NEET early</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Program Duration:</strong> 2-year progressive program, can start mid-year</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">NCERT-aligned foundation curriculum</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Biology concept building from basics</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Early exposure to NEET exam patterns</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Progressive difficulty increase year-over-year</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Concept-based learning instead of memorization</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Flexible admission mid-year for Class 10</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Program Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Class 9 Program</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹18,000/year</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Full Class 9 Biology curriculum</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Monthly tests</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Study materials</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Online learning platform</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI NEET Foundation Program - Class 9 Program"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Class 10 Program</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹22,000/year</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Full Class 10 Biology curriculum</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">NEET pattern introduction</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Bi-weekly assessments</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Priority support</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI NEET Foundation Program - Class 10 Program"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Both Classes Bundle</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹35,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Class 9 + Class 10 full curriculum</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">2-year progression</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Foundation + intermediate level</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Comprehensive exam prep</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI NEET Foundation Program - Both Classes Bundle"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                
          </div>
          <div className="mt-8 text-center">
            <SmartWhatsAppCTA 
              message="Compare NRI NEET Foundation Program plans"
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
                  <h3 className="font-bold text-gray-900 mb-3">Is it too early to start NEET preparation in Class 9?</h3>
                  <p className="text-gray-700 leading-relaxed">Not at all! Early preparation is highly beneficial. Students score 50-80 marks higher.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">How is this different from regular Class 9-10 Biology?</h3>
                  <p className="text-gray-700 leading-relaxed">We align topics with NEET patterns while covering school curriculum completely.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Can my child start mid-year if we enroll in Class 10?</h3>
                  <p className="text-gray-700 leading-relaxed">Yes! You'll receive recorded sessions plus live access to ongoing classes.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">What's the teaching approach for foundation students?</h3>
                  <p className="text-gray-700 leading-relaxed">We use concept-based learning with relatable examples rather than rote memorization.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Are there tests and assessments for Class 9-10 students?</h3>
                  <p className="text-gray-700 leading-relaxed">Yes, monthly tests in Class 9 and bi-weekly assessments in Class 10.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Will this program prepare my child for board exams too?</h3>
                  <p className="text-gray-700 leading-relaxed">Absolutely! Our curriculum covers complete board exam syllabus with deeper understanding.</p>
                </div>
                
          </div>
          <div className="mt-8 text-center">
            <SmartWhatsAppCTA 
              message="Questions about NRI NEET Foundation Program"
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
              message="Enroll in NRI NEET Foundation Program"
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
