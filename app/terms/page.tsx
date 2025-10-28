export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        <p className="text-xl text-gray-600 mb-2">
          Effective Date: January 1, 2025
        </p>
        <p className="text-gray-600 mb-8">
          Last Updated: January 1, 2025
        </p>

        {/* Introduction */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            These Terms and Conditions ("Terms") govern your use of the SalesPottery website and your wholesale
            business relationship with us. By accessing our website or placing orders, you agree to be bound by
            these Terms. Please read them carefully before proceeding.
          </p>
        </div>

        {/* General Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. General Terms</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>1.1 Business Information:</strong> SalesPottery is a wholesale pottery supplier
                operating from Turkey. Contact: fatihtunali@gmail.com | +90 532 585 8786
              </p>
              <p>
                <strong>1.2 Wholesale Only:</strong> Our services are exclusively for businesses, retailers,
                interior designers, and other commercial buyers. We do not sell directly to consumers.
              </p>
              <p>
                <strong>1.3 Business Verification:</strong> We reserve the right to verify your business
                credentials and may require business registration documents, tax ID, or resale certificates.
              </p>
              <p>
                <strong>1.4 Agreement:</strong> By placing an order, you enter into a binding wholesale
                purchase agreement subject to these Terms.
              </p>
            </div>
          </div>
        </section>

        {/* Orders and Pricing */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Orders and Pricing</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <div>
                <strong>2.1 Minimum Order Quantity:</strong>
                <p className="mt-1">
                  Standard minimum order is 50 pieces. Custom orders may have different minimums. Mixed
                  product orders are permitted within the minimum quantity requirement.
                </p>
              </div>
              <div>
                <strong>2.2 Price Quotes:</strong>
                <p className="mt-1">
                  All prices are quoted individually based on product selection, quantity, and destination.
                  Quoted prices are valid for 30 days unless otherwise specified. Prices exclude shipping
                  and applicable taxes unless stated otherwise.
                </p>
              </div>
              <div>
                <strong>2.3 Order Acceptance:</strong>
                <p className="mt-1">
                  Your order is not binding until we send written confirmation. We reserve the right to
                  accept or decline any order at our discretion. Order confirmation will include final
                  pricing, shipping costs, and estimated delivery timeline.
                </p>
              </div>
              <div>
                <strong>2.4 Price Changes:</strong>
                <p className="mt-1">
                  We reserve the right to adjust prices due to currency fluctuations, material cost changes,
                  or other factors. Once an order is confirmed, pricing is locked for that order.
                </p>
              </div>
              <div>
                <strong>2.5 Currency:</strong>
                <p className="mt-1">
                  Prices can be quoted in EUR, USD, GBP, or TRY. Exchange rates are locked at time of order
                  confirmation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <div>
                <strong>3.1 Payment Methods:</strong>
                <p className="mt-1">
                  We accept bank transfers (SWIFT), PayPal, and major credit cards. Payment method fees may apply.
                </p>
              </div>
              <div>
                <strong>3.2 Payment Schedule - New Customers:</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>50% deposit required upon order confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>50% balance due before shipping</span>
                  </li>
                </ul>
              </div>
              <div>
                <strong>3.3 Payment Terms - Established Customers:</strong>
                <p className="mt-1">
                  After 3+ successful orders, eligible customers may apply for Net-30 or Net-60 terms.
                  Credit applications and business references required. Terms subject to approval and
                  credit limits.
                </p>
              </div>
              <div>
                <strong>3.4 Late Payments:</strong>
                <p className="mt-1">
                  Late payments may incur interest charges of 1.5% per month. We reserve the right to
                  suspend accounts with overdue balances and pursue collection.
                </p>
              </div>
              <div>
                <strong>3.5 Taxes and Duties:</strong>
                <p className="mt-1">
                  Buyers are responsible for all applicable taxes, customs duties, and import fees in their
                  country. We can provide necessary documentation for customs clearance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Production and Delivery */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Production and Delivery</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <div>
                <strong>4.1 Lead Times:</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>In-stock items: 5-7 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Custom orders: 4-6 weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Large volume orders (500+ pieces): 6-8 weeks</span>
                  </li>
                </ul>
                <p className="mt-2">
                  Lead times are estimates and may vary due to production capacity, material availability,
                  or unforeseen circumstances.
                </p>
              </div>
              <div>
                <strong>4.2 Handmade Nature:</strong>
                <p className="mt-1">
                  All products are handcrafted. Slight variations in size, color, glaze, and finish are
                  natural characteristics of handmade pottery and are not considered defects. Variations
                  typically within 5-10% are acceptable.
                </p>
              </div>
              <div>
                <strong>4.3 Custom Orders:</strong>
                <p className="mt-1">
                  Custom and specially made items are non-refundable and non-cancellable once production
                  begins. Design approval and 50% deposit required before production starts.
                </p>
              </div>
              <div>
                <strong>4.4 Delivery:</strong>
                <p className="mt-1">
                  Shipping times and costs vary by destination. We provide tracking information for all
                  shipments. Risk of loss transfers to buyer upon delivery to carrier. All shipments
                  are insured.
                </p>
              </div>
              <div>
                <strong>4.5 Delays:</strong>
                <p className="mt-1">
                  We are not liable for delays caused by circumstances beyond our control including but
                  not limited to: natural disasters, carrier delays, customs delays, strikes, or
                  governmental actions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Order Cancellation */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Order Cancellation and Changes</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <div>
                <strong>5.1 Buyer Cancellation:</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Before production: Full refund minus 10% processing fee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>After production begins: 50% cancellation fee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>After completion/shipment: No refund</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Custom orders: Non-cancellable once production begins</span>
                  </li>
                </ul>
              </div>
              <div>
                <strong>5.2 Order Modifications:</strong>
                <p className="mt-1">
                  Changes to orders must be requested in writing before production begins. We will
                  accommodate changes when possible, but cannot guarantee acceptance. Changes may
                  affect pricing and delivery timeline.
                </p>
              </div>
              <div>
                <strong>5.3 Our Right to Cancel:</strong>
                <p className="mt-1">
                  We reserve the right to cancel orders due to: product unavailability, pricing errors,
                  suspected fraud, or inability to verify business credentials. Full refund provided
                  if we cancel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Returns and Refunds */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Our return policy is detailed in our Returns Policy page. Key points:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Damaged items must be reported within 48 hours with photographic evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Manufacturing defects accepted within 7 days of delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Natural variations in handmade items are not grounds for return</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Custom orders are non-returnable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>20% restocking fee may apply to approved returns</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              See full Returns Policy at{' '}
              <a href="/returns" className="text-amber-600 hover:text-amber-700 underline">
                /returns
              </a>
            </p>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <div>
                <strong>7.1 Our Property:</strong>
                <p className="mt-1">
                  All product designs, images, descriptions, and website content are our intellectual property
                  or used with permission. Unauthorized use, reproduction, or distribution is prohibited.
                </p>
              </div>
              <div>
                <strong>7.2 Product Imagery:</strong>
                <p className="mt-1">
                  Wholesale customers may use our product images for marketing and sales purposes with
                  proper attribution. Images may not be modified or used to suggest endorsement without
                  written permission.
                </p>
              </div>
              <div>
                <strong>7.3 Your Property:</strong>
                <p className="mt-1">
                  For custom orders using your designs, you warrant that you own or have rights to use
                  the intellectual property. You indemnify us against any IP infringement claims.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Warranties and Disclaimers */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Warranties and Disclaimers</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <div>
                <strong>8.1 Quality Warranty:</strong>
                <p className="mt-1">
                  We warrant that products are free from manufacturing defects and will be of merchantable
                  quality suitable for their intended purpose. This warranty is limited to replacement or
                  refund of defective items.
                </p>
              </div>
              <div>
                <strong>8.2 Handmade Disclaimer:</strong>
                <p className="mt-1">
                  Due to the handmade nature, minor variations are expected and not covered by warranty.
                  Product images are representative; actual items may vary slightly.
                </p>
              </div>
              <div>
                <strong>8.3 Use Disclaimer:</strong>
                <p className="mt-1">
                  Products are sold for decorative and functional pottery use. We make no warranties
                  regarding suitability for specific purposes beyond normal pottery use. Food-safe
                  products are marked as such.
                </p>
              </div>
              <div>
                <strong>8.4 Website Disclaimer:</strong>
                <p className="mt-1">
                  Website content is provided "as is". We strive for accuracy but do not warrant that
                  descriptions, pricing, or availability are error-free. We reserve the right to correct
                  errors and update information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>9.1</strong> Our total liability for any claim arising from or related to these
                Terms or your orders shall not exceed the amount you paid for the specific products
                giving rise to the claim.
              </p>
              <p>
                <strong>9.2</strong> We are not liable for indirect, incidental, consequential, or
                special damages including lost profits, business interruption, or loss of business
                opportunity.
              </p>
              <p>
                <strong>9.3</strong> We are not liable for delays, failures, or damages caused by
                circumstances beyond our reasonable control (force majeure).
              </p>
              <p>
                <strong>9.4</strong> Any claim must be made within 6 months of the issue arising.
              </p>
            </div>
          </div>
        </section>

        {/* Confidentiality */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Confidentiality</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700">
              Both parties agree to maintain confidentiality of proprietary information, pricing,
              designs, and business terms shared during our relationship. This obligation survives
              termination of the business relationship.
            </p>
          </div>
        </section>

        {/* Governing Law */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law and Disputes</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <div>
                <strong>11.1 Governing Law:</strong>
                <p className="mt-1">
                  These Terms are governed by the laws of the Republic of Turkey. For international
                  transactions, the United Nations Convention on Contracts for the International Sale
                  of Goods (CISG) applies where applicable.
                </p>
              </div>
              <div>
                <strong>11.2 Dispute Resolution:</strong>
                <p className="mt-1">
                  We encourage resolving disputes through good faith negotiations first. If negotiations
                  fail, disputes shall be resolved through arbitration in Istanbul, Turkey under the
                  rules of the Istanbul Arbitration Centre.
                </p>
              </div>
              <div>
                <strong>11.3 Jurisdiction:</strong>
                <p className="mt-1">
                  For matters not subject to arbitration, courts of Istanbul, Turkey shall have
                  exclusive jurisdiction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* General Provisions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. General Provisions</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-gray-700">
              <div>
                <strong>12.1 Entire Agreement:</strong>
                <p className="mt-1">
                  These Terms, together with our Privacy Policy and Returns Policy, constitute the
                  entire agreement between parties and supersede all prior agreements.
                </p>
              </div>
              <div>
                <strong>12.2 Amendments:</strong>
                <p className="mt-1">
                  We may update these Terms at any time. Updated Terms will be posted with a new
                  effective date. Continued use after changes constitutes acceptance.
                </p>
              </div>
              <div>
                <strong>12.3 Severability:</strong>
                <p className="mt-1">
                  If any provision is found invalid or unenforceable, the remaining provisions remain
                  in full effect.
                </p>
              </div>
              <div>
                <strong>12.4 Waiver:</strong>
                <p className="mt-1">
                  Failure to enforce any provision does not waive our right to enforce it later or
                  other provisions.
                </p>
              </div>
              <div>
                <strong>12.5 Assignment:</strong>
                <p className="mt-1">
                  You may not assign or transfer your rights or obligations without our written consent.
                  We may assign our rights and obligations to a successor entity.
                </p>
              </div>
              <div>
                <strong>12.6 Language:</strong>
                <p className="mt-1">
                  These Terms are written in English. Any translations are for convenience only.
                  In case of conflict, the English version prevails.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
          <p className="text-lg mb-6">
            Contact us if you have any questions about these Terms and Conditions
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:fatihtunali@gmail.com" className="hover:underline text-lg">
                fatihtunali@gmail.com
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phone / WhatsApp</h3>
              <a href="tel:+905325858786" className="hover:underline text-lg">
                +90 532 585 8786
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm">
              By using our services, you acknowledge that you have read, understood, and agree to be
              bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
