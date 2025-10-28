'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    // Ordering & Pricing
    {
      category: 'Ordering & Pricing',
      question: 'What is the minimum order quantity?',
      answer: 'Our minimum order quantity is 50 pieces. This can be a mix of different products from our catalog. For custom orders or specific designs, minimum quantities may vary. Contact us for details on your specific requirements.'
    },
    {
      category: 'Ordering & Pricing',
      question: 'Do you offer volume discounts?',
      answer: 'Yes! We offer tiered pricing based on order volume. Orders of 100+ pieces receive 5% discount, 200+ pieces get 10% discount, and 500+ pieces receive 15% discount. Special pricing is available for regular wholesale partners and large orders. Contact us for a custom quote.'
    },
    {
      category: 'Ordering & Pricing',
      question: 'Can I order samples before placing a bulk order?',
      answer: 'Absolutely! We encourage sample orders to ensure you\'re satisfied with our quality. Sample orders (5-10 pieces) are available at a slightly reduced wholesale rate plus shipping. Sample costs can be credited toward your first bulk order of 100+ pieces.'
    },
    {
      category: 'Ordering & Pricing',
      question: 'How do I get a wholesale price quote?',
      answer: 'Contact us via email (fatihtunali@gmail.com) or WhatsApp (+90 532 585 8786) with the product codes and quantities you\'re interested in. We\'ll provide a detailed quote including pricing, shipping costs, and estimated delivery time within 24 hours.'
    },

    // Custom Orders & Branding
    {
      category: 'Custom Orders & Branding',
      question: 'Can you create custom designs for my business?',
      answer: 'Yes! We specialize in custom pottery designs for wholesale clients. We can modify existing designs, create new ones based on your specifications, or replicate designs you provide. Custom orders typically require a minimum of 100 pieces and 4-6 weeks lead time.'
    },
    {
      category: 'Custom Orders & Branding',
      question: 'Do you offer private labeling or branding?',
      answer: 'Yes, we offer several branding options: custom stamps/signatures on pottery bases, branded packaging, custom gift boxes, and branded labels. Branding setup fees may apply. White label services are available for qualified wholesale partners.'
    },
    {
      category: 'Custom Orders & Branding',
      question: 'Can you match specific colors or glazes?',
      answer: 'We can work with you to match specific colors and glazes. Please note that handmade pottery may have natural variations, and exact color matching cannot be guaranteed. We recommend ordering samples first to ensure the colors meet your expectations.'
    },

    // Production & Lead Times
    {
      category: 'Production & Lead Times',
      question: 'What is the typical lead time for wholesale orders?',
      answer: 'Standard orders (in-stock items): 5-7 business days. Custom orders: 4-6 weeks depending on complexity and quantity. Large volume orders (500+ pieces): 6-8 weeks. Rush orders may be accommodated for an additional fee - contact us to discuss your timeline.'
    },
    {
      category: 'Production & Lead Times',
      question: 'How is the pottery made?',
      answer: 'All our pottery is handcrafted by skilled artisans using traditional techniques. Each piece is individually shaped, glazed, and fired in our kilns. This artisanal process ensures unique character in every piece, though it means slight variations in size, color, and finish are natural and expected.'
    },
    {
      category: 'Production & Lead Times',
      question: 'Can you handle large recurring orders?',
      answer: 'Yes! We work with many businesses on recurring order schedules. We can set up monthly, quarterly, or seasonal production schedules to ensure consistent supply. This also allows for better pricing and guaranteed production slots.'
    },

    // Shipping & Delivery
    {
      category: 'Shipping & Delivery',
      question: 'Where do you ship to?',
      answer: 'We ship worldwide! Our primary markets are the European Union, UK, North America, and Turkey. We use reliable carriers including DHL Express, FedEx International, and UPS Worldwide. Shipping times vary by destination: EU (5-10 days), International (7-15 days), Turkey (2-4 days).'
    },
    {
      category: 'Shipping & Delivery',
      question: 'How is the pottery packaged for shipping?',
      answer: 'We take packaging seriously! Each piece is individually wrapped in bubble wrap, placed in sturdy double-wall cardboard boxes with dividers, and secured with padding. All shipments include fragile stickers, handling instructions, and are fully insured. See our Shipping page for more details.'
    },
    {
      category: 'Shipping & Delivery',
      question: 'Who pays for shipping costs?',
      answer: 'Shipping costs are calculated based on order weight, dimensions, destination, and chosen carrier. These costs are included in your quote. For regular wholesale partners and large orders, we offer discounted or free shipping. Turkey domestic orders over 10,000 TRY qualify for free shipping.'
    },

    // Payment & Terms
    {
      category: 'Payment & Terms',
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers (wire/SWIFT), PayPal (for smaller orders), and major credit cards. For established wholesale partners, we can arrange net-30 or net-60 payment terms. First-time orders typically require 50% deposit with balance due before shipping.'
    },
    {
      category: 'Payment & Terms',
      question: 'Do you offer payment terms or credit accounts?',
      answer: 'Yes, for qualified wholesale customers with established relationship (3+ successful orders), we offer net-30 or net-60 payment terms. Credit applications and references may be required. Contact us to discuss setting up a credit account.'
    },
    {
      category: 'Payment & Terms',
      question: 'What currency do you accept?',
      answer: 'We accept multiple currencies including EUR, USD, GBP, and TRY. Prices can be quoted in your preferred currency. Exchange rates are locked in at the time of quote acceptance to protect both parties from fluctuations.'
    },

    // Quality & Returns
    {
      category: 'Quality & Returns',
      question: 'What is your quality control process?',
      answer: 'Every piece undergoes rigorous inspection before shipping. We check for structural integrity, glaze quality, finish consistency, and adherence to specifications. Pieces with significant defects are rejected. Minor variations inherent to handmade items are normal and add to their artisanal character.'
    },
    {
      category: 'Quality & Returns',
      question: 'What if items arrive damaged?',
      answer: 'All shipments are fully insured. If damage occurs during shipping: (1) Inspect your shipment immediately upon delivery, (2) Take photos of damaged items and packaging, (3) Contact us within 48 hours at fatihtunali@gmail.com. We will replace damaged items or issue a refund at no cost to you.'
    },
    {
      category: 'Quality & Returns',
      question: 'What is your return policy for wholesale orders?',
      answer: 'We accept returns for manufacturing defects, damage, or shipping errors. Due to the nature of wholesale and handmade items, returns for change of mind are handled case-by-case with a 20% restocking fee. All returns must be requested within 7 days of delivery. See our Returns page for complete details.'
    },

    // Business & Partnership
    {
      category: 'Business & Partnership',
      question: 'Do you work with interior designers and decorators?',
      answer: 'Absolutely! We love working with design professionals. We offer trade discounts, custom design services, project-specific production, and can work within your project timelines. Contact us to discuss your project requirements and set up a trade account.'
    },
    {
      category: 'Business & Partnership',
      question: 'Can I become an exclusive distributor in my region?',
      answer: 'We are open to exclusive distribution agreements in certain regions for qualified partners. This typically requires consistent minimum order volumes and marketing commitments. Contact us to discuss exclusive partnership opportunities for your market.'
    },
    {
      category: 'Business & Partnership',
      question: 'Do you attend trade shows?',
      answer: 'Yes, we regularly attend major home and gift trade shows in Europe and Turkey. Contact us for our current trade show schedule. We also offer virtual showroom tours and video consultations for international clients.'
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 mb-8">
          Everything you need to know about wholesale pottery ordering
        </p>

        {/* Quick Contact */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Can't find your answer?</h2>
          <p className="text-gray-700 mb-4">
            Our wholesale team is here to help! Get in touch and we'll answer any questions you have.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:fatihtunali@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
            <a
              href="https://wa.me/905325858786"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:+905325858786"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>

        {/* FAQ by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{category}</h2>
            <div className="space-y-3">
              {faqs
                .filter(faq => faq.category === category)
                .map((faq, index) => {
                  const globalIndex = faqs.findIndex(f => f === faq);
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={globalIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between gap-4"
                      >
                        <span className="font-semibold text-gray-900">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-amber-600 transition-transform flex-shrink-0 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Wholesale Order?</h2>
          <p className="text-lg mb-6">
            Browse our catalog and request a quote today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Products
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition-colors"
            >
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
