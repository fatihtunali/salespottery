'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageGallery from '@/components/ImageGallery';
import { ProductWithDetails } from '@/types/database';
import InquiryModal from '@/components/InquiryModal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useLanguage();

  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-200 rounded-lg h-96 animate-pulse" />
          <div className="space-y-4">
            <div className="bg-gray-200 h-8 rounded animate-pulse" />
            <div className="bg-gray-200 h-6 rounded animate-pulse" />
            <div className="bg-gray-200 h-24 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || t('productDetail.notFound')}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category.name}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-900 font-semibold">{t('wholesale.pricingAvailable')}</p>
              <p className="text-amber-700 text-sm mt-1">{t('wholesale.pricingNote')}</p>
            </div>
          </div>

          {product.description && (
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {product.long_description && (
            <div className="prose prose-sm">
              <p className="text-gray-600">{product.long_description}</p>
            </div>
          )}

          {/* Specifications */}
          <div className="border-t border-b border-gray-200 py-6 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">{t('productDetail.specifications')}</h3>

            {product.material && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('productDetail.material')}:</span>
                <span className="font-medium text-gray-900">{product.material}</span>
              </div>
            )}

            {product.color && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('productDetail.color')}:</span>
                <span className="font-medium text-gray-900">{product.color}</span>
              </div>
            )}

            {product.technique && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('productDetail.technique')}:</span>
                <span className="font-medium text-gray-900">{product.technique}</span>
              </div>
            )}

            {(product.height_cm || product.width_cm || product.depth_cm) && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('productDetail.dimensions')}:</span>
                <span className="font-medium text-gray-900">
                  {product.height_cm && `H: ${product.height_cm}cm`}
                  {product.width_cm && ` W: ${product.width_cm}cm`}
                  {product.depth_cm && ` D: ${product.depth_cm}cm`}
                </span>
              </div>
            )}

            {product.weight_kg && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('productDetail.weight')}:</span>
                <span className="font-medium text-gray-900">{product.weight_kg} kg</span>
              </div>
            )}
          </div>

          {/* Care Instructions */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">{t('productDetail.careInstructions')}</h3>
            <div className="flex flex-wrap gap-2">
              {product.is_dishwasher_safe && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ {t('productDetail.dishwasherSafe')}
                </span>
              )}
              {product.is_microwave_safe && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ {t('productDetail.microwaveSafe')}
                </span>
              )}
              {product.is_food_safe && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ {t('productDetail.foodSafe')}
                </span>
              )}
              {product.is_handmade && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  ✓ {t('products.handmade')}
                </span>
              )}
            </div>
          </div>

          {/* Request Quote Button */}
          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="w-full py-4 px-6 rounded-lg font-semibold text-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            {t('wholesale.requestQuote')}
          </button>

          {/* Contact Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">{t('wholesale.contactDirectly')}</h3>
            <div className="space-y-2 text-sm">
              <a
                href="https://wa.me/905325858786"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp: +90 532 585 8786
              </a>
              <a
                href="mailto:fatihtunali@gmail.com"
                className="flex items-center gap-2 text-gray-700 hover:text-amber-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: fatihtunali@gmail.com
              </a>
              <a
                href="tel:+905325858786"
                className="flex items-center gap-2 text-gray-700 hover:text-amber-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone: +90 532 585 8786
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {product && (
        <InquiryModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          productId={product.id}
          productName={product.name}
          productImage={product.images[0]?.image_url}
        />
      )}
    </div>
  );
}
