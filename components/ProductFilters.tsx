'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types/database';

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<(Category & { product_count: number })[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    params.delete('page'); // Reset to page 1
    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryClick = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get('category') === slug) {
      params.delete('category'); // Toggle off if already selected
    } else {
      params.set('category', slug);
    }
    params.delete('page'); // Reset to page 1
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    router.push('/products');
  };

  const currentCategory = searchParams.get('category');
  const hasFilters = searchParams.get('search') || searchParams.get('category');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pottery..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Search
          </button>
        </div>
      </form>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentCategory === category.slug
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.product_count})
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={clearFilters}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
