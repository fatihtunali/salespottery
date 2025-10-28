'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  productImage?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  productId,
  productName,
  productImage,
}: InquiryModalProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    company_name: '',
    quantity: 50,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate minimum quantity
    if (formData.quantity < 50) {
      setError('Minimum order quantity is 50 pieces');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          product_id: productId,
          product_name: productName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setIsSuccess(true);

      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setFormData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          company_name: '',
          quantity: 50,
          message: '',
        });
        setIsSuccess(false);
        onClose();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Product Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Wholesale Quote</h2>
            <div className="flex items-center gap-4">
              {productImage && (
                <img
                  src={productImage}
                  alt={productName}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <p className="text-gray-600 text-sm">Product:</p>
                <p className="font-semibold text-gray-900">{productName}</p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">Thank you! Your inquiry has been submitted successfully.</p>
              <p className="text-green-600 text-sm mt-1">We'll contact you within 24 hours.</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  required
                  value={formData.customer_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="customer_email"
                  name="customer_email"
                  required
                  value={formData.customer_email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="customer_phone"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  placeholder="+90 5XX XXX XXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (Minimum 50 pieces) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                required
                min="50"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum order quantity: 50 pieces
              </p>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message / Additional Requirements
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Please let us know any specific requirements, customization requests, or questions..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              ></textarea>
            </div>

            {/* Contact Methods Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-amber-900 mb-2">You can also contact us directly:</p>
              <div className="space-y-1 text-sm text-amber-800">
                <p>📱 WhatsApp: <a href="https://wa.me/905325858786" className="underline hover:text-amber-600" target="_blank" rel="noopener noreferrer">+90 532 585 8786</a></p>
                <p>📧 Email: <a href="mailto:fatihtunali@gmail.com" className="underline hover:text-amber-600">fatihtunali@gmail.com</a></p>
                <p>📞 Phone: <a href="tel:+905325858786" className="underline hover:text-amber-600">+90 532 585 8786</a></p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
