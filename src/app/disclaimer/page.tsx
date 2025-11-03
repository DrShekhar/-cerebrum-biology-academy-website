import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | Cerebrum Biology Academy',
  description:
    'Legal disclaimer for Cerebrum Biology Academy educational services and website content.',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            Disclaimer
          </h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            <strong>Last updated:</strong>{' '}
            {new Date().toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-amber-900 mb-2">
              Important Notice
            </h2>
            <p className="text-amber-800 text-sm sm:text-base">
              This disclaimer governs the use of our website and services. By using our website or
              services, you accept this disclaimer in full. Please read it carefully before
              proceeding.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                1. General Information
              </h2>
              <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
                <p>
                  The information on this website is provided on an "as is" basis. To the fullest
                  extent permitted by law, Cerebrum Biology Academy excludes all representations,
                  warranties, obligations, and liabilities arising out of or in connection with the
                  information provided on this website.
                </p>
                <p>
                  This website and its content are subject to change without notice. We make no
                  representations or warranties about the accuracy, completeness, or suitability of
                  the information, software, products, and services provided.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Educational Results and Performance
              </h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">2.1 No Guarantee of Results</h3>
                <p>
                  While we are committed to providing high-quality educational services, we make no
                  guarantees regarding:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Specific examination scores or rankings</li>
                  <li>Success in NEET or other medical entrance examinations</li>
                  <li>Admission to specific medical colleges or institutions</li>
                  <li>Improvement in academic performance</li>
                  <li>Time required to achieve learning objectives</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900">2.2 Individual Factors</h3>
                <p>Academic success depends on numerous factors including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Student's prior academic background and foundation</li>
                  <li>Individual aptitude and learning abilities</li>
                  <li>Commitment to studies and attendance</li>
                  <li>External factors beyond our control</li>
                  <li>Personal circumstances and health</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Website Content and Accuracy
              </h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">3.1 Content Accuracy</h3>
                <p>
                  While we strive to ensure the accuracy of information on our website, we cannot
                  guarantee that all content is:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Complete, accurate, or up-to-date</li>
                  <li>Free from technical errors or omissions</li>
                  <li>Suitable for your specific educational needs</li>
                  <li>Compliant with the latest examination patterns or syllabi</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900">3.2 Third-Party Content</h3>
                <p>
                  Our website may contain links to third-party websites or reference third-party
                  content. We do not endorse or take responsibility for the accuracy, quality, or
                  reliability of such external content.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Technical Disclaimer</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">4.1 System Availability</h3>
                <p>We make no guarantees regarding:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Uninterrupted access to our website or online platform</li>
                  <li>Error-free operation of our services</li>
                  <li>Compatibility with all devices or browsers</li>
                  <li>Data security during transmission</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900">4.2 Technical Issues</h3>
                <p>
                  Users are responsible for ensuring their systems meet technical requirements and
                  maintaining appropriate security measures. We are not liable for issues arising
                  from incompatible systems or security breaches on the user's end.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Faculty and Staff Qualifications
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  While we provide information about our faculty qualifications and experience, we
                  make no guarantees about:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Availability of specific faculty members</li>
                  <li>Teaching styles matching individual preferences</li>
                  <li>Faculty remaining with the organization throughout the course duration</li>
                </ul>
                <p>
                  Faculty information is provided for general reference and may be subject to
                  change.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Medical and Health Advice
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our educational content is for informational purposes only and should not be
                  considered as:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Professional medical advice</li>
                  <li>Diagnosis or treatment recommendations</li>
                  <li>Substitute for consultation with healthcare professionals</li>
                </ul>
                <p>
                  Students studying medical topics should always refer to current medical texts and
                  consult qualified healthcare professionals for any health-related decisions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Financial Disclaimer</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Investment in education involves financial commitment. We make no guarantees
                  about:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Return on educational investment</li>
                  <li>Future earning potential after course completion</li>
                  <li>Career opportunities or job placement</li>
                  <li>Fee stability for future academic years</li>
                </ul>
                <p>
                  All fee information is subject to change. Students should carefully consider their
                  financial situation before enrolling.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Testimonials and Success Stories
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Success stories and testimonials represent individual experiences and results.
                  They should not be considered as:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Typical or guaranteed results</li>
                  <li>Promise of similar outcomes for other students</li>
                  <li>Indication of future performance</li>
                </ul>
                <p>
                  Individual results may vary significantly based on personal circumstances, effort,
                  and various external factors.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  To the maximum extent permitted by law, Cerebrum Biology Academy shall not be
                  liable for any:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Direct, indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, data, or other intangible losses</li>
                  <li>Damages resulting from use or inability to use our services</li>
                  <li>Damages arising from reliance on website content</li>
                  <li>Third-party actions or omissions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Changes to Curriculum and Services
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We reserve the right to modify, update, or discontinue any aspect of our services,
                  including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Course content and curriculum</li>
                  <li>Teaching methodology and tools</li>
                  <li>Class schedules and timings</li>
                  <li>Fee structure and policies</li>
                  <li>Terms and conditions</li>
                </ul>
                <p>
                  Such changes will be communicated to enrolled students as per our communication
                  policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Jurisdiction and Applicable Law
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  This disclaimer is governed by the laws of India. Any disputes arising from the
                  use of our website or services will be subject to the jurisdiction of courts in
                  New Delhi, India.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you have questions about this disclaimer or need clarification:</p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p>
                    <strong>Email:</strong> legal@cerebrumbiologyacademy.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 88264 44334
                  </p>
                  <p>
                    <strong>Address:</strong> Cerebrum Biology Academy, New Delhi, India
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Acknowledgment</h3>
              <p className="text-blue-700">
                By using our website and services, you acknowledge that you have read, understood,
                and agree to the terms of this disclaimer. If you do not agree with any part of this
                disclaimer, please discontinue use of our services immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
