import { SmartWhatsAppCTA } from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';

const stats = ["500+ NRI students counseled", "98% admission success rate for qualified students", "\u20b95,000 - \u20b945,000 pricing", "15% NRI quota expertise"];

export function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NRI Medical Admission Counseling</h1>
          <p className="text-xl mb-6 opacity-90">Comprehensive counseling for NRI families navigating Indian medical admissions.</p>
          <div className="flex gap-4 flex-wrap">
            <SmartWhatsAppCTA 
              message="Know more about NRI Medical Admission Counseling"
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
            <p className="text-lg text-gray-700 mb-4"><strong>Target Audience:</strong> NRI families navigating Indian medical admissions</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Program Duration:</strong> Comprehensive guidance process</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Complete 15% NRI quota explanation</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Medical college selection guidance</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Fee structure comparison across colleges</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Document preparation and verification</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Counseling process step-by-step guidance</span></li>
              <li className="flex items-start"><span className="text-blue-600 font-bold mr-3">•</span><span className="text-gray-700">Post-admission support</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Program Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Basic Guide</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹5,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">15% NRI quota explained</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">College list PDF</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Fee structure comparison</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Email support</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI Medical Admission Counseling - Basic Guide"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Full Counseling</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹25,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">All Basic features</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">1-on-1 counseling sessions</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">College recommendation</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Document preparation guide</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">WhatsApp support</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI Medical Admission Counseling - Full Counseling"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Premium Support</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹45,000</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">All Full Counseling features</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Unlimited counseling sessions</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Admission process assistance</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Bank loan guidance</span></li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">Post-admission support</span></li>
                  </ul>
                  <SmartWhatsAppCTA 
                    message="Interested in NRI Medical Admission Counseling - Premium Support"
                    buttonText="Enroll Now"
                    className="w-full bg-green-500 hover:bg-green-600"
                  />
                </div>
                
          </div>
          <div className="mt-8 text-center">
            <SmartWhatsAppCTA 
              message="Compare NRI Medical Admission Counseling plans"
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
                  <h3 className="font-bold text-gray-900 mb-3">What is the 15% NRI quota in Indian medical colleges?</h3>
                  <p className="text-gray-700 leading-relaxed">The 15% NRI quota is a separate merit-based category for Non-Resident Indians.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">What score is needed for NRI quota medical admission?</h3>
                  <p className="text-gray-700 leading-relaxed">Generally, scores range from 550-650+ depending on the college's reputation.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Which medical colleges have the best NRI quota programs?</h3>
                  <p className="text-gray-700 leading-relaxed">Top colleges like AIIMS Delhi, JIPMER Puducherry, CMC Vellore have good NRI programs.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">What documents are required for NRI medical admission?</h3>
                  <p className="text-gray-700 leading-relaxed">Key documents include passport, NEET scorecard, school certificates, and domicile proof.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">How is the NRI counseling process different from general admission?</h3>
                  <p className="text-gray-700 leading-relaxed">NRI counseling follows a separate process with registration, merit list, and document verification.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Can you help with admission to private medical colleges as well?</h3>
                  <p className="text-gray-700 leading-relaxed">Yes! We guide families on private college options with fee structure comparison.</p>
                </div>
                
          </div>
          <div className="mt-8 text-center">
            <SmartWhatsAppCTA 
              message="Questions about NRI Medical Admission Counseling"
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
              message="Enroll in NRI Medical Admission Counseling"
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
