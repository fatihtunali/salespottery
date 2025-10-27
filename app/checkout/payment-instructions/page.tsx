'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentInstructionsPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Success Icon */}
        <div className="mb-8 text-center">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600">
            Order Number: <span className="font-semibold text-amber-600">{orderNumber}</span>
          </p>
        </div>

        {/* Payment Instructions */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Instructions</h2>

          <div className="space-y-6">
            {/* Bank Transfer Details */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Transfer Details</h3>

              <div className="space-y-3">
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="font-medium text-gray-700">Bank Name:</span>
                  <span className="text-gray-900">Deutsche Bank AG</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="font-medium text-gray-700">Account Holder:</span>
                  <span className="text-gray-900">SalesPottery GmbH</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="font-medium text-gray-700">IBAN:</span>
                  <span className="text-gray-900 font-mono">DE89 3704 0044 0532 0130 00</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="font-medium text-gray-700">BIC/SWIFT:</span>
                  <span className="text-gray-900 font-mono">COBADEFFXXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Reference:</span>
                  <span className="text-gray-900 font-semibold">{orderNumber}</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-amber-100 rounded border border-amber-300">
                <p className="text-sm text-gray-800">
                  <strong>Important:</strong> Please include your order number <strong>{orderNumber}</strong> in the payment reference/description. This helps us process your order faster.
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What Happens Next?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    1
                  </span>
                  <div>
                    <p className="text-gray-900 font-medium">Make the Payment</p>
                    <p className="text-sm text-gray-600">
                      Transfer the total amount to our bank account using the details above.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    2
                  </span>
                  <div>
                    <p className="text-gray-900 font-medium">Payment Confirmation</p>
                    <p className="text-sm text-gray-600">
                      We'll verify your payment within 1-2 business days and send you a confirmation email.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    3
                  </span>
                  <div>
                    <p className="text-gray-900 font-medium">Order Processing</p>
                    <p className="text-sm text-gray-600">
                      Once payment is confirmed, we'll prepare and ship your handcrafted pottery items.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    4
                  </span>
                  <div>
                    <p className="text-gray-900 font-medium">Shipping & Tracking</p>
                    <p className="text-sm text-gray-600">
                      You'll receive tracking information via email once your order ships.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Email */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-blue-900">Confirmation Email Sent</p>
                  <p className="text-sm text-blue-800">
                    We've sent an order confirmation with payment instructions to your email. Please check your spam folder if you don't see it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-center"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-block bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors text-center"
          >
            Return to Homepage
          </Link>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">Questions about your order?</p>
          <p>
            Contact us at{' '}
            <a href="mailto:orders@salespottery.com" className="text-amber-600 hover:text-amber-700 font-medium">
              orders@salespottery.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
