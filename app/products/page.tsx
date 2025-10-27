'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { ProductListItem } from '@/types/database';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductsResponse {
  products: ProductListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ProductsPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (page) params.set('page', page);
        if (category) params.set('category', category);
        if (search) params.set('search', search);

        const response = await fetch(`/api/products?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch products');

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, category, search]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {t('products.error')}: {error}
        </div>
      </div>
    );
  }

  if (!data || data.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            {t('products.noProducts')}
          </h2>
          <p className="text-gray-500">{t('products.tryAdjusting')}</p>
        </div>
      </div>
    );
  }

  const { products, pagination } = data;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {t('products.pageTitle')}
        </h1>
        <p className="text-gray-600">
          {t('products.showing')} {products.length} {t('products.of')} {pagination.total} {t('products.productsCount')}
        </p>
      </div>

      <ProductFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {[...Array(pagination.totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <a
                key={pageNum}
                href={`/products?page=${pageNum}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`}
                className={`px-4 py-2 rounded-lg font-medium ${
                  pageNum === pagination.page
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {pageNum}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
