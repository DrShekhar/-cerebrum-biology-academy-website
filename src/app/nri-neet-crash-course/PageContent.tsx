import { SmartWhatsAppCTA } from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';

const stats = ["Average improvement: 120+ marks", "Focus on top 40 high-yield topics", "\u20b928,000 - \u20b965,000 pricing", "Daily mock tests included"];

export function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NRI NEET Crash Course</h1>
          <p className="text-xl mb-6 opacity-90">Last-minute intensive 3-6 month program for NRI students before NEET. Focus on high-yield topics, daily mock tests, and NCERT revision.</p>
          <div className="flex gap-4 flex-wrap">
            <SmartWhatsAppCTA 
              message="Know more about NRI NEET Crash Course"
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
            <p className="text-lg text-gray-700 mb-4"><strong>Target Audience:</strong> Students in final 3-6 months before NEET</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Program Duration:</strong> 3 or 6 months intensive</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Topic prioritization - focus on 40 high-yield chapters</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Daily mock tests to build exam confidence</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">NCERT revision videos and notes</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Quick concept clarification sessions</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Previous year analysis to predict paper pattern</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Last-minute strategy sessions</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Program Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">3-Month Program</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹28,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">90-day intensive access</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Daily mock tests</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Study materials</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Email support</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI NEET Crash Course - 3-Month Program"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">6-Month Program</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹45,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">180-day comprehensive access</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">All 3-month features</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Priority WhatsApp support</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Personalized guidance</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI NEET Crash Course - 6-Month Program"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Premium Fast-Track</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹65,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">All 6-month features</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Daily 1-on-1 sessions</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Speed improvement focus</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Guaranteed results support</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI NEET Crash Course - Premium Fast-Track"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                
          </div>
          <div className="mt-8 text-center">
            <SmartWhatsAppCTA 
              message="Compare NRI NEET Crash Course plans"
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
                  <h3 className="font-bold text-gray-900 mb-3">Is 3-6 months enough time to improve my NEET score significantly?</h3>
                  <p className="text-gray-700 leading-relaxed">Yes! Our crash course focuses on high-yield topics that constitute 70% of the NEET paper.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Which 40 topics should I prioritize in my last months?</h3>
                  <p className="text-gray-700 leading-relaxed">We provide detailed topic prioritization based on NEET exam analysis.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">How many mock tests are included in the crash course?</h3>
                  <p className="text-gray-700 leading-relaxed">In the 3-month program: ~90 mock tests. In the 6-month program: ~180 mock tests.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Can NRI students join mid-month?</h3>
                  <p className="text-gray-700 leading-relaxed">Yes! You can start the program at any point and catch up with recorded sessions.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">What makes this different from regular NEET preparation?</h3>
                  <p className="text-gray-700 leading-relaxed">Our crash course is specifically designed for last-minute preparation with focus on exam strategy.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Is NCERT revision included or should I study separately?</h3>
                  <p className="text-gray-700 leading-relaxed">Complete NCERT revision notes and videos are provided as part of the crash course.</p>
                </div>
                
          </div>
          <div className="mt-8 text-center">
            <SmartWhatsAppCTA 
              message="Questions about NRI NEET Crash Course"
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
              message="Enroll in NRI NEET Crash Course"
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
