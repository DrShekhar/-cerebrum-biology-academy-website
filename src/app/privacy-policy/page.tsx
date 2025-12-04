import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Cerebrum Biology Academy',
  description:
    'Privacy Policy for Cerebrum Biology Academy - How we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 md:py-16 pb-24 sm:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-8">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            <strong>Last updated:</strong>{' '}
            {new Date().toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="space-y-6 sm:space-y-8 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  At Cerebrum Biology Academy, we collect information you provide directly to us,
                  such as when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create an account or enroll in our courses</li>
                  <li>Contact us with inquiries or for customer support</li>
                  <li>Participate in surveys or feedback forms</li>
                  <li>Subscribe to our newsletter or marketing communications</li>
                  <li>Take mock tests or assessments on our platform</li>
                </ul>
                <p>
                  This information may include your name, email address, phone number, academic
                  details, payment information, and any other information you choose to provide.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                2. How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our educational services</li>
                  <li>Process enrollments and manage your account</li>
                  <li>Send you course materials, updates, and important announcements</li>
                  <li>Provide customer support and respond to your inquiries</li>
                  <li>Personalize your learning experience</li>
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third
                  parties without your consent, except as described in this policy:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Service Providers:</strong> We may share information with trusted third
                    parties who assist in operating our website and services
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose information when required
                    by law or to protect our rights
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In the event of a merger or acquisition,
                    user information may be transferred
                  </li>
                  <li>
                    <strong>With Consent:</strong> We may share information for other purposes with
                    your explicit consent
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                4. Data Security
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We implement appropriate technical and organizational security measures to protect
                  your personal information against unauthorized access, alteration, disclosure, or
                  destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Staff training on data protection practices</li>
                </ul>
                <p>
                  However, no method of transmission over the internet or electronic storage is 100%
                  secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                5. Your Rights and Choices
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Restrict processing of your data</li>
                  <li>Data portability (receive your data in a structured format)</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@cerebrumbiologyacademy.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our
                  website. These technologies help us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website usage and performance</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Enable certain website features and functionality</li>
                </ul>
                <p>
                  You can control cookie preferences through your browser settings, but some
                  features may not function properly if cookies are disabled.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                7. Third-Party Links
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our website may contain links to third-party websites or services. We are not
                  responsible for the privacy practices or content of these external sites. We
                  encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                8. Children's Privacy
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our services are primarily designed for students aged 13 and above. We do not
                  knowingly collect personal information from children under 13 without parental
                  consent. If we become aware that we have collected personal information from a
                  child under 13 without parental consent, we will take steps to delete such
                  information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                9. International Data Transfers
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Your information may be transferred to and processed in countries other than your
                  own. We ensure that such transfers are made in accordance with applicable data
                  protection laws and with appropriate safeguards in place.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                10. Changes to This Policy
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any
                  material changes by posting the new policy on this page and updating the "Last
                  updated" date. Your continued use of our services after such modifications
                  constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                11. Contact Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please
                  contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p>
                    <strong>Email:</strong> privacy@cerebrumbiologyacademy.com
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
            <p className="text-sm text-gray-500 text-center">
              This Privacy Policy is effective as of the date listed above and governs our
              collection, use, and disclosure of your personal information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
