import Link from 'next/link';
import Image from 'next/image';
import { ProductListItem } from '@/types/database';
import Price from './Price';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  product: ProductListItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const inStock = product.available_quantity > 0;
  const imageUrl = product.primary_image || '/images/placeholder-product.jpg';

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.is_featured && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {t('products.featured')}
          </span>
        )}
        {!inStock && (
          <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {t('products.soldOut')}
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category_name}
        </p>
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <Price amount={product.base_price} className="text-lg font-bold text-gray-900" />
          {product.is_handmade && (
            <span className="text-xs text-amber-600 font-medium">{t('products.handmade')}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
