'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageGallery from '@/components/ImageGallery';
import { ProductWithDetails } from '@/types/database';
import { useCart } from '@/contexts/CartContext';
import Price from '@/components/Price';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

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

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setAddingToCart(true);
      setAddedMessage(null);
      await addToCart(product.id, quantity);
      setAddedMessage(t('products.added'));
      setQuantity(1); // Reset quantity

      // Clear success message after 3 seconds
      setTimeout(() => {
        setAddedMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setAddedMessage(t('products.failed'));
    } finally {
      setAddingToCart(false);
    }
  };

  const incrementQuantity = () => {
    if (product?.inventory && quantity < product.inventory.available_quantity) {
      setQuantity(q => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

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

  const inStock = product.inventory && product.inventory.available_quantity > 0;

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
            <Price amount={product.base_price} className="text-3xl font-bold text-amber-600" />
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

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {inStock ? (
              <>
                <span className="inline-flex items-center w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-700">
                  {t('products.inStock')} ({product.inventory?.available_quantity} {t('products.available')})
                </span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-sm text-gray-700">{t('products.outOfStock')}</span>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          {inStock && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">{t('productDetail.quantity')}:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.inventory?.available_quantity || 1}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= (product.inventory?.available_quantity || 1)) {
                      setQuantity(val);
                    }
                  }}
                  className="w-16 text-center py-2 border-x border-gray-300 focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= (product.inventory?.available_quantity || 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {addedMessage && (
            <div
              className={`p-4 rounded-lg ${
                addedMessage.includes('Failed')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {addedMessage}
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock || addingToCart}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
              inStock && !addingToCart
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {addingToCart ? t('products.adding') : inStock ? t('products.addToCart') : t('products.outOfStock')}
          </button>
        </div>
      </div>
    </div>
  );
}
