export default function GDPRPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">GDPR Compliance</h1>
        <p className="text-xl text-gray-600 mb-8">
          How we protect your data and comply with European data protection regulations
        </p>

        {/* Introduction */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Data Protection</h2>
          <p className="text-gray-700 leading-relaxed">
            At SalesPottery, we take your privacy seriously and are committed to complying with the
            European Union's General Data Protection Regulation (GDPR). This page explains how we implement
            GDPR principles and outlines your rights as a data subject under this regulation.
          </p>
        </div>

        {/* GDPR Principles */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">GDPR Principles We Follow</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Lawfulness & Transparency
              </h3>
              <p className="text-gray-700 text-sm">
                We process data lawfully, fairly, and transparently. We clearly communicate why and how
                we use your data.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Purpose Limitation
              </h3>
              <p className="text-gray-700 text-sm">
                We collect data for specific, explicit, and legitimate purposes. We don't use your data
                for purposes you haven't been informed about.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Data Minimization
              </h3>
              <p className="text-gray-700 text-sm">
                We only collect data that is necessary for our business purposes. We don't ask for
                information we don't need.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Accuracy
              </h3>
              <p className="text-gray-700 text-sm">
                We keep your data accurate and up to date. You can request corrections to your
                information at any time.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Storage Limitation
              </h3>
              <p className="text-gray-700 text-sm">
                We retain data only as long as necessary for legitimate business and legal purposes.
                We delete or anonymize data when no longer needed.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Integrity & Confidentiality
              </h3>
              <p className="text-gray-700 text-sm">
                We implement appropriate security measures to protect your data from unauthorized
                access, loss, or damage.
              </p>
            </div>
          </div>
        </section>

        {/* Your GDPR Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Under GDPR</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-amber-600">1.</span>
                  Right to Access
                </h3>
                <p className="text-gray-700 mb-2">
                  You have the right to request a copy of the personal data we hold about you.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>How to exercise:</strong> Email us at fatihtunali@gmail.com requesting access
                  to your data. We'll provide it in a commonly used electronic format within 30 days.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-amber-600">2.</span>
                  Right to Rectification
                </h3>
                <p className="text-gray-700 mb-2">
                  You can request correction of inaccurate or incomplete personal data.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>How to exercise:</strong> Contact us with the correct information and we'll
                  update your records promptly.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-amber-600">3.</span>
                  Right to Erasure ("Right to be Forgotten")
                </h3>
                <p className="text-gray-700 mb-2">
                  You can request deletion of your personal data in certain circumstances.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>When this applies:</strong> When data is no longer necessary, when you withdraw
                  consent, when there's no legal basis for processing, or when you object to processing.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Exceptions:</strong> We may retain data for legal obligations (accounting,
                  tax records) or to establish/defend legal claims.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-amber-600">4.</span>
                  Right to Restriction of Processing
                </h3>
                <p className="text-gray-700 mb-2">
                  You can request that we limit how we use your data in certain situations.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>When this applies:</strong> When you contest accuracy, when processing is
                  unlawful but you don't want erasure, when we no longer need the data but you need
                  it for legal claims, or when you've objected to processing pending verification.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-amber-600">5.</span>
                  Right to Data Portability
                </h3>
                <p className="text-gray-700 mb-2">
                  You can receive your data in a structured, machine-readable format and transmit it
                  to another controller.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>How to exercise:</strong> Request your data in CSV, JSON, or other portable
                  formats. We'll provide it within 30 days.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-amber-600">6.</span>
                  Right to Object
                </h3>
                <p className="text-gray-700 mb-2">
                  You can object to processing based on legitimate interests or for direct marketing.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Direct marketing:</strong> We'll stop immediately upon request. No questions asked.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Other processing:</strong> We'll assess your objection and cease processing
                  unless we have compelling legitimate grounds.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-amber-600">7.</span>
                  Right to Withdraw Consent
                </h3>
                <p className="text-gray-700 mb-2">
                  When processing is based on consent, you can withdraw it at any time.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Effect:</strong> Withdrawal doesn't affect lawfulness of processing before
                  withdrawal. We'll stop processing unless we have another legal basis.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-amber-600">8.</span>
                  Right to Lodge a Complaint
                </h3>
                <p className="text-gray-700 mb-2">
                  You have the right to complain to a data protection authority about our data practices.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Where to complain:</strong> Your local supervisory authority in the EU/EEA.
                  We encourage you to contact us first so we can address your concerns directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Exercise Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Exercise Your Rights</h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Contact Us</h3>
                <p className="text-gray-700 text-sm">
                  Send your request to <a href="mailto:fatihtunali@gmail.com" className="text-amber-600 hover:text-amber-700 underline">fatihtunali@gmail.com</a> or
                  call <a href="tel:+905325858786" className="text-amber-600 hover:text-amber-700 underline">+90 532 585 8786</a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Verify Your Identity</h3>
                <p className="text-gray-700 text-sm">
                  For security, we may ask you to verify your identity before processing your request.
                  This protects your data from unauthorized access.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Specify Your Request</h3>
                <p className="text-gray-700 text-sm">
                  Clearly state which right you're exercising and provide relevant details. The more
                  specific you are, the faster we can respond.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">4. We Respond Within 30 Days</h3>
                <p className="text-gray-700 text-sm">
                  We'll acknowledge your request immediately and provide a full response within 30 days.
                  If we need more time, we'll explain why and give you an expected timeline.
                </p>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-blue-300">
                <p className="text-sm text-gray-700">
                  <strong>No Cost:</strong> Exercising your GDPR rights is free of charge. However,
                  if requests are manifestly unfounded or excessive, we may charge a reasonable fee
                  or refuse the request.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Processing Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Data We Process and Why</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Data Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Purpose</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Legal Basis</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Retention</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Contact Information</td>
                    <td className="py-3 px-4">Order processing, communication</td>
                    <td className="py-3 px-4">Contract</td>
                    <td className="py-3 px-4">7-10 years</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Business Details</td>
                    <td className="py-3 px-4">Wholesale verification, invoicing</td>
                    <td className="py-3 px-4">Contract</td>
                    <td className="py-3 px-4">7-10 years</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Order History</td>
                    <td className="py-3 px-4">Fulfillment, customer service</td>
                    <td className="py-3 px-4">Contract</td>
                    <td className="py-3 px-4">7-10 years</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Payment Information</td>
                    <td className="py-3 px-4">Transaction processing</td>
                    <td className="py-3 px-4">Contract</td>
                    <td className="py-3 px-4">7-10 years</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4">Website Analytics</td>
                    <td className="py-3 px-4">Improve user experience</td>
                    <td className="py-3 px-4">Legitimate Interest</td>
                    <td className="py-3 px-4">2 years</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Marketing Preferences</td>
                    <td className="py-3 px-4">Send promotions, newsletters</td>
                    <td className="py-3 px-4">Consent</td>
                    <td className="py-3 px-4">Until withdrawn</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Data Transfers */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              We are based in Turkey, which is not part of the EU. When you provide us with data,
              it is transferred to Turkey. We ensure your data is protected through:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>
                  <strong>Standard Contractual Clauses (SCCs):</strong> We use EU-approved contract
                  terms with service providers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>
                  <strong>Adequate Security Measures:</strong> We implement the same high standards
                  of data protection regardless of location
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>
                  <strong>Limited Transfers:</strong> We only transfer data when necessary for
                  fulfilling our services
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Data Protection Officer */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection Contact</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              For all GDPR-related inquiries, requests, or concerns, please contact:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 font-semibold">Privacy & Data Protection</p>
              <p className="text-gray-700">SalesPottery</p>
              <p className="text-gray-700 mt-2">
                Email: <a href="mailto:fatihtunali@gmail.com" className="text-amber-600 hover:text-amber-700 underline">
                  fatihtunali@gmail.com
                </a>
              </p>
              <p className="text-gray-700">
                Phone/WhatsApp: <a href="tel:+905325858786" className="text-amber-600 hover:text-amber-700 underline">
                  +90 532 585 8786
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Have Questions About Your Data?</h2>
          <p className="text-lg mb-6">
            We're committed to transparency and protecting your privacy. Contact us anytime with
            questions or to exercise your GDPR rights.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:fatihtunali@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
            <a
              href="/privacy"
              className="inline-flex items-center gap-2 px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition-colors"
            >
              Read Full Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
