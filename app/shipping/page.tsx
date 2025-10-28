export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
        <p className="text-xl text-gray-600 mb-8">
          Everything you need to know about shipping for wholesale orders
        </p>

        {/* Shipping Overview */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wholesale Shipping Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            We offer reliable international shipping for all wholesale orders. Our experienced logistics team ensures
            your pottery arrives safely and on time. All shipments are fully insured and tracked.
          </p>
        </div>

        {/* Shipping Zones */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Zones & Delivery Times</h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🇪🇺 European Union</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Delivery Time:</strong> 5-10 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Shipping Method:</strong> DHL Express, FedEx International</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Customs:</strong> Smooth EU customs clearance</span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🌍 International (Non-EU)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Delivery Time:</strong> 7-15 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Shipping Method:</strong> DHL Express, FedEx International, UPS Worldwide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Customs:</strong> Customer responsible for customs duties and taxes</span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🇹🇷 Turkey (Domestic)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Delivery Time:</strong> 2-4 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Shipping Method:</strong> Yurtiçi Kargo, Aras Kargo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Free shipping:</strong> Orders over 10,000 TRY</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Shipping Costs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Costs</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Shipping costs are calculated based on:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Order weight and dimensions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Destination country</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Shipping method selected</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Insurance coverage</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Note:</strong> Exact shipping costs will be quoted with your wholesale price quote.
              Volume discounts available for regular customers.
            </p>
          </div>
        </section>

        {/* Packaging */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Packaging & Protection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🎁 Professional Packaging</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Each piece individually wrapped in bubble wrap</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Sturdy cardboard boxes with dividers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Double-wall boxes for international shipping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Fragile stickers and handling instructions</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🛡️ Insurance & Tracking</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Full insurance coverage included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Real-time tracking number provided</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Signature required upon delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Email notifications at each stage</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Custom Requirements */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Shipping Requirements</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              We can accommodate special shipping requirements:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Split shipments to multiple locations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Custom packaging with your branding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Scheduled delivery dates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>White label services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Freight forwarding arrangements</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              Contact us to discuss your specific shipping needs.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Have Shipping Questions?</h2>
          <p className="text-lg mb-6">Our logistics team is here to help with your wholesale shipping needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/905325858786"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
