'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
}

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id === 'new' ? null : params.id;
  const isEdit = productId !== null;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    slug: '',
    description: '',
    long_description: '',
    category_id: '',
    base_price: '',
    height_cm: '',
    width_cm: '',
    depth_cm: '',
    weight_kg: '',
    material: '',
    color: '',
    technique: '',
    is_dishwasher_safe: false,
    is_microwave_safe: false,
    is_food_safe: true,
    is_active: true,
    is_featured: false,
    is_handmade: true,
    meta_title: '',
    meta_description: '',
    quantity: '',
  });

  useEffect(() => {
    checkAuth();
    loadCategories();
    if (isEdit) loadProduct();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me');
      if (!response.ok) router.push('/admin/login');
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`);
      const data = await response.json();

      if (data.product) {
        setFormData({
          sku: data.product.sku || '',
          name: data.product.name || '',
          slug: data.product.slug || '',
          description: data.product.description || '',
          long_description: data.product.long_description || '',
          category_id: data.product.category_id?.toString() || '',
          base_price: data.product.base_price?.toString() || '',
          height_cm: data.product.height_cm?.toString() || '',
          width_cm: data.product.width_cm?.toString() || '',
          depth_cm: data.product.depth_cm?.toString() || '',
          weight_kg: data.product.weight_kg?.toString() || '',
          material: data.product.material || '',
          color: data.product.color || '',
          technique: data.product.technique || '',
          is_dishwasher_safe: Boolean(data.product.is_dishwasher_safe),
          is_microwave_safe: Boolean(data.product.is_microwave_safe),
          is_food_safe: Boolean(data.product.is_food_safe),
          is_active: Boolean(data.product.is_active),
          is_featured: Boolean(data.product.is_featured),
          is_handmade: Boolean(data.product.is_handmade),
          meta_title: data.product.meta_title || '',
          meta_description: data.product.meta_description || '',
          quantity: data.product.stock_quantity?.toString() || '',
        });
      }
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generate slug from name
    if (name === 'name' && !isEdit) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const url = isEdit ? `/api/admin/products/${productId}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        category_id: parseInt(formData.category_id),
        base_price: parseFloat(formData.base_price),
        height_cm: formData.height_cm ? parseFloat(formData.height_cm) : null,
        width_cm: formData.width_cm ? parseFloat(formData.width_cm) : null,
        depth_cm: formData.depth_cm ? parseFloat(formData.depth_cm) : null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        quantity: formData.quantity ? parseInt(formData.quantity) : null,
        initial_quantity: formData.quantity ? parseInt(formData.quantity) : null,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage(isEdit ? 'Product updated successfully!' : 'Product created successfully!');
        setTimeout(() => router.push('/admin/products'), 1500);
      } else {
        const data = await response.json();
        setMessage(`Error: ${data.message || 'Failed to save product'}`);
      }
    } catch (error) {
      setMessage('Error: Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/products" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes('Error')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
                <textarea
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (EUR) *</label>
                <input
                  type="number"
                  step="0.01"
                  name="base_price"
                  value={formData.base_price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Pottery Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pottery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="e.g., Stoneware, Porcelain"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Technique</label>
                <input
                  type="text"
                  name="technique"
                  value={formData.technique}
                  onChange={handleChange}
                  placeholder="e.g., Wheel thrown, Hand built"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_dishwasher_safe"
                    checked={formData.is_dishwasher_safe}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                  />
                  <span className="text-sm text-gray-700">Dishwasher Safe</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_microwave_safe"
                    checked={formData.is_microwave_safe}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                  />
                  <span className="text-sm text-gray-700">Microwave Safe</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_food_safe"
                    checked={formData.is_food_safe}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                  />
                  <span className="text-sm text-gray-700">Food Safe</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_handmade"
                    checked={formData.is_handmade}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                  />
                  <span className="text-sm text-gray-700">Handmade</span>
                </label>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dimensions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  name="height_cm"
                  value={formData.height_cm}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  name="width_cm"
                  value={formData.width_cm}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Depth (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  name="depth_cm"
                  value={formData.depth_cm}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  name="weight_kg"
                  value={formData.weight_kg}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                />
                <span className="text-sm text-gray-700 font-medium">Active (visible on store)</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                />
                <span className="text-sm text-gray-700 font-medium">Featured Product</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Link
              href="/admin/products"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
