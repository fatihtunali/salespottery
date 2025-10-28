export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Refunds Policy</h1>
        <p className="text-xl text-gray-600 mb-8">
          Our wholesale return policy and quality guarantee
        </p>

        {/* Quality Guarantee */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quality Guarantee</h2>
          <p className="text-gray-700 leading-relaxed">
            We take pride in our handcrafted pottery and stand behind the quality of every piece.
            All products undergo rigorous quality control before shipping. We ensure that you receive
            products that meet our high standards and your expectations.
          </p>
        </div>

        {/* Damaged or Defective Items */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Damaged or Defective Items</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              We understand that damage can occur during shipping despite our careful packaging.
              If you receive damaged or defective items:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">1.</span>
                <span>
                  <strong>Inspect upon delivery:</strong> Check your shipment immediately upon arrival.
                  Note any visible damage to the packaging.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">2.</span>
                <span>
                  <strong>Document the damage:</strong> Take clear photos of the damaged items and packaging.
                  This is required for insurance claims.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">3.</span>
                <span>
                  <strong>Contact us within 48 hours:</strong> Email us at{' '}
                  <a href="mailto:fatihtunali@gmail.com" className="text-amber-600 hover:text-amber-700 underline">
                    fatihtunali@gmail.com
                  </a>{' '}
                  with photos and order details.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">4.</span>
                <span>
                  <strong>Resolution:</strong> We will replace damaged items free of charge or issue a refund
                  for the damaged portion of your order.
                </span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                <strong>All shipments are fully insured.</strong> We handle all insurance claims on your behalf.
              </p>
            </div>
          </div>
        </section>

        {/* Wholesale Return Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wholesale Return Policy</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Due to the handmade nature of our products and wholesale pricing, returns are handled differently
              than retail purchases:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligible for Return</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Manufacturing defects or quality issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Items damaged during shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Incorrect items shipped</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Significant discrepancies from product descriptions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Not Eligible for Return</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Change of mind or business decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Minor variations in handmade items (slight color/size differences)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Custom or specially ordered items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Items used, resold, or no longer in original condition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Return Process */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Process & Timeline</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Process</h3>
              <ol className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">1.</span>
                  <span>Contact us with your order number and reason for return</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">2.</span>
                  <span>Receive authorization and return instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">3.</span>
                  <span>Package items securely (return shipping costs may apply)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">4.</span>
                  <span>Ship to our facility with tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">5.</span>
                  <span>Inspection and approval (3-5 business days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600">6.</span>
                  <span>Refund or replacement processed</span>
                </li>
              </ol>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Timelines</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span><strong>Report damage:</strong> Within 48 hours of delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span><strong>Quality issues:</strong> Within 7 days of delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span><strong>Return approval:</strong> 1-2 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span><strong>Inspection:</strong> 3-5 business days after receipt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span><strong>Refund processing:</strong> 5-10 business days</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Restocking Fees */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Restocking Fees</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Restocking fees may apply to returns that are not due to our error:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">No Restocking Fee</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Manufacturing defects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Damaged items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Our shipping errors</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">20% Restocking Fee</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Returns approved on case-by-case basis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Items in perfect, resalable condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Return shipping costs borne by customer</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Methods */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Methods</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Once your return is approved, you may choose:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-600">1.</span>
                <span>
                  <strong>Replacement:</strong> We'll ship replacement items at no additional cost
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600">2.</span>
                <span>
                  <strong>Store Credit:</strong> 110% of the return value for future orders
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600">3.</span>
                <span>
                  <strong>Refund:</strong> Original payment method (minus any applicable fees)
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need to Start a Return?</h2>
          <p className="text-lg mb-6">
            Contact our customer service team and we'll help resolve any issues quickly
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:fatihtunali@gmail.com" className="hover:underline">
                fatihtunali@gmail.com
              </a>
              <p className="text-sm mt-1 text-white/80">We respond within 24 hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phone / WhatsApp</h3>
              <a href="tel:+905325858786" className="hover:underline">
                +90 532 585 8786
              </a>
              <p className="text-sm mt-1 text-white/80">Mon-Fri: 9:00 AM - 6:00 PM EEST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
