import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Cerebrum Biology Academy',
  description: 'Terms and conditions for using Cerebrum Biology Academy services and educational platform.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing and using the services provided by Cerebrum Biology Academy ("we," "us," or "our"), 
                  you ("user" or "student") agree to be bound by these Terms of Service. If you do not agree 
                  to these terms, please do not use our services.
                </p>
                <p>
                  These terms apply to all users of our website, online platform, courses, and related services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
              <div className="space-y-4 text-gray-700">
                <p>Cerebrum Biology Academy provides:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Online and offline biology coaching for NEET and board examinations</li>
                  <li>Interactive mock tests and assessments</li>
                  <li>Study materials and educational resources</li>
                  <li>Live and recorded classes</li>
                  <li>Doubt resolution and academic support</li>
                  <li>Performance analytics and progress tracking</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <div className="space-y-4 text-gray-700">
                <p>To access certain services, you must create an account. You agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Take responsibility for all activities under your account</li>
                  <li>Keep your account information updated</li>
                </ul>
                <p>
                  You must be at least 13 years old to create an account. If you are under 18, 
                  you must have parental or guardian consent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Course Enrollment and Payment</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">4.1 Enrollment</h3>
                <p>Course enrollment is subject to availability and our admission criteria.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">4.2 Fees and Payment</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Course fees must be paid as per the agreed schedule</li>
                  <li>All prices are in Indian Rupees unless otherwise stated</li>
                  <li>Payment can be made through approved payment methods</li>
                  <li>Fees are non-transferable between courses or students</li>
                  <li>Late payment may result in service suspension</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">4.3 Refund Policy</h3>
                <p>
                  Refunds are subject to our separate Refund Policy. Please refer to our 
                  refund policy page for detailed terms and conditions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Share your account credentials with others</li>
                  <li>Record, copy, or redistribute our course content</li>
                  <li>Use our services for any illegal or unauthorized purpose</li>
                  <li>Interfere with or disrupt our services or servers</li>
                  <li>Upload or transmit harmful, offensive, or inappropriate content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use our platform to solicit or promote competing services</li>
                  <li>Engage in any form of harassment or abusive behavior</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All content provided through our services, including but not limited to course materials, 
                  videos, tests, and educational resources, is protected by intellectual property laws and 
                  is owned by or licensed to Cerebrum Biology Academy.
                </p>
                <p>You are granted a limited, non-exclusive, non-transferable license to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and use course materials for personal educational purposes</li>
                  <li>Download materials where explicitly permitted</li>
                </ul>
                <p>You may not reproduce, distribute, or create derivative works without our written permission.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Your privacy is important to us. Our collection and use of personal information 
                  is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Availability and Technical Requirements</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  While we strive to provide uninterrupted service, we do not guarantee that our 
                  services will be available at all times. Service may be temporarily unavailable 
                  due to maintenance, updates, or technical issues.
                </p>
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintaining compatible devices and software</li>
                  <li>Ensuring reliable internet connectivity</li>
                  <li>Meeting minimum technical requirements for our platform</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers and Limitations of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">9.1 Educational Outcomes</h3>
                <p>
                  While we are committed to providing high-quality education, we cannot guarantee 
                  specific academic results or examination success. Student performance depends on 
                  various factors including individual effort, aptitude, and external circumstances.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900">9.2 Service Disclaimer</h3>
                <p>
                  Our services are provided "as is" without warranties of any kind, either express 
                  or implied. We disclaim all warranties including merchantability, fitness for a 
                  particular purpose, and non-infringement.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900">9.3 Limitation of Liability</h3>
                <p>
                  Our liability for any damages shall not exceed the amount paid by you for the 
                  specific service that gave rise to the claim.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Either party may terminate this agreement at any time. We reserve the right to 
                  suspend or terminate your access to our services for violations of these terms 
                  or for any other reason at our discretion.
                </p>
                <p>Upon termination:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your access to our services will cease</li>
                  <li>You must stop using all course materials</li>
                  <li>Refunds, if applicable, will be processed according to our refund policy</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law and Dispute Resolution</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  These Terms are governed by the laws of India. Any disputes arising from these 
                  terms or our services shall be resolved through:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Direct negotiation between the parties</li>
                  <li>Mediation if negotiation fails</li>
                  <li>Arbitration under the Indian Arbitration and Conciliation Act</li>
                </ol>
                <p>
                  The jurisdiction for any legal proceedings shall be New Delhi, India.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of 
                  material changes via email or prominent notice on our website. Continued use of 
                  our services after such changes constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>Email:</strong> legal@cerebrumbiologyacademy.com</p>
                  <p><strong>Phone:</strong> +91 88264 44334</p>
                  <p><strong>Address:</strong> Cerebrum Biology Academy, New Delhi, India</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              By using our services, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}