import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | Cerebrum Biology Academy',
  description: 'Refund and cancellation policy for Cerebrum Biology Academy courses and services.',
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Important Note</h2>
            <p className="text-blue-800">
              We are committed to providing high-quality educational services and want our students to be satisfied 
              with their learning experience. Please read this policy carefully to understand our refund terms and conditions.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Refund Eligibility</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">1.1 Course Cancellation by Student</h3>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Within 7 Days of Enrollment</h4>
                      <p className="text-green-700 text-sm">
                        <strong>100% Refund</strong> - Full refund minus processing fees (₹500)
                      </p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">8-15 Days After Enrollment</h4>
                      <p className="text-yellow-700 text-sm">
                        <strong>75% Refund</strong> - If less than 25% of course completed
                      </p>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">16-30 Days After Enrollment</h4>
                      <p className="text-orange-700 text-sm">
                        <strong>50% Refund</strong> - If less than 50% of course completed
                      </p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">After 30 Days</h4>
                      <p className="text-red-700 text-sm">
                        <strong>No Refund</strong> - Refunds not available after 30 days
                      </p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900">1.2 Course Cancellation by Academy</h3>
                <p>
                  If we cancel a course due to insufficient enrollment or other reasons, students will receive 
                  a 100% refund or can transfer to another suitable batch.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Non-Refundable Items</h2>
              <div className="space-y-4 text-gray-700">
                <p>The following are non-refundable:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Registration and enrollment fees</li>
                  <li>Study materials and books (if shipped)</li>
                  <li>Mock test series (if accessed more than 3 times)</li>
                  <li>One-on-one doubt clearing sessions (once availed)</li>
                  <li>Certificate processing fees</li>
                  <li>Payment processing charges</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Special Circumstances</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">3.1 Medical Emergency</h3>
                <p>
                  In case of serious illness or medical emergency (with proper medical documentation), 
                  we may offer course freeze or transfer to next batch instead of refund.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900">3.2 Technical Issues</h3>
                <p>
                  If you experience persistent technical issues that prevent access to course content, 
                  and our technical team cannot resolve them within 15 days, you may be eligible for 
                  a partial refund.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900">3.3 Course Quality Issues</h3>
                <p>
                  If course content significantly differs from what was advertised, or quality issues 
                  are identified, we will work to resolve the issue or provide appropriate compensation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Refund Process</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">4.1 How to Request a Refund</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Send a written request to refunds@cerebrumbiologyacademy.com</li>
                  <li>Include your enrollment details and reason for refund</li>
                  <li>Provide supporting documentation if applicable</li>
                  <li>Submit within the eligible time frame</li>
                </ol>
                
                <h3 className="text-lg font-semibold text-gray-900">4.2 Processing Time</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Refund requests are reviewed within 7-10 business days</li>
                  <li>Approved refunds are processed within 15-30 business days</li>
                  <li>Refunds are credited to the original payment method</li>
                  <li>Bank processing time may add additional 3-7 business days</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Installment Payment Refunds</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  For courses paid in installments:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Refund eligibility is calculated based on total course fee</li>
                  <li>Future installments will be cancelled</li>
                  <li>Refund amount will be adjusted against paid installments</li>
                  <li>Any outstanding dues must be settled before processing refunds</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Course Transfer Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  As an alternative to refunds, we offer course transfers:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Transfer to next available batch (one-time only)</li>
                  <li>Course freeze for up to 6 months (medical reasons)</li>
                  <li>Subject change within same academic level (if available)</li>
                  <li>Upgrade to higher-tier course (with price difference)</li>
                </ul>
                <p>
                  <strong>Transfer Fee:</strong> ₹1,000 administrative fee applies for voluntary transfers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Dispute Resolution</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you are not satisfied with our refund decision:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Contact our customer service team for reconsideration</li>
                  <li>Escalate to the Academic Director if needed</li>
                  <li>Final appeals can be made to the Management Committee</li>
                </ol>
                <p>
                  We are committed to fair resolution of all refund disputes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Important Terms and Conditions</h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All refund requests must be made in writing</li>
                  <li>Verbal refund requests will not be accepted</li>
                  <li>Course progress is measured by content accessed, not time elapsed</li>
                  <li>Weekend and holiday periods do not extend refund deadlines</li>
                  <li>This policy supersedes any verbal assurances made during enrollment</li>
                  <li>Refund amounts are calculated on the base course fee, excluding taxes</li>
                  <li>International students may have additional processing fees</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  For refund requests and queries:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>Email:</strong> refunds@cerebrumbiologyacademy.com</p>
                  <p><strong>Phone:</strong> +91 88264 44334 (Mon-Fri: 9 AM - 6 PM)</p>
                  <p><strong>WhatsApp:</strong> +91 88264 44334</p>
                  <p><strong>Address:</strong> Cerebrum Biology Academy, New Delhi, India</p>
                </div>
                <p className="text-sm text-gray-600">
                  Please allow 24-48 hours for email responses during business days.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Before Requesting a Refund</h3>
              <p className="text-yellow-700">
                We encourage you to contact our student support team if you're facing any issues with your course. 
                Often, we can resolve problems and ensure you get the most value from your learning investment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}