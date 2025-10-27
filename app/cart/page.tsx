'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function CartPage() {
  const { cart, itemCount, isLoading, updateQuantity, removeItem, clearCart } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    try {
      setUpdatingItems(prev => new Set(prev).add(itemId));
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      setRemovingItems(prev => new Set(prev).add(itemId));
      await removeItem(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setRemovingItems(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-200 h-8 w-48 rounded animate-pulse mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 h-32 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {isEmpty ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some beautiful pottery pieces to get started!</p>
            <Link
              href="/products"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              {cart.items.map((item, index) => {
                const isUpdating = updatingItems.has(item.id);
                const isRemoving = removingItems.has(item.id);
                const itemTotal = Number(item.price_at_addition) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className={`p-6 ${index !== 0 ? 'border-t border-gray-200' : ''} ${
                      isRemoving ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Link href={`/products/${item.product.slug}`}>
                          {item.product.primary_image ? (
                            <Image
                              src={item.product.primary_image}
                              alt={item.product.name}
                              width={120}
                              height={120}
                              className="rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-400 text-sm">No image</span>
                            </div>
                          )}
                        </Link>
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between mb-2">
                          <div>
                            <Link
                              href={`/products/${item.product.slug}`}
                              className="text-lg font-semibold text-gray-900 hover:text-amber-600"
                            >
                              {item.product.name}
                            </Link>
                            {item.product.category_name && (
                              <p className="text-sm text-gray-500">{item.product.category_name}</p>
                            )}
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            €{itemTotal.toFixed(2)}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                          €{Number(item.price_at_addition).toFixed(2)} each
                        </p>

                        {/* Quantity Controls and Remove Button */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || isUpdating || isRemoving}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                              {isUpdating ? '...' : item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={
                                item.quantity >= item.product.available_quantity ||
                                isUpdating ||
                                isRemoving
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isRemoving}
                            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 transition-colors"
                          >
                            {isRemoving ? 'Removing...' : 'Remove'}
                          </button>

                          {item.product.available_quantity <= 5 && (
                            <span className="text-sm text-orange-600 font-medium">
                              Only {item.product.available_quantity} left in stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span>€{cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>€{cart.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="block w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-center"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={handleClearCart}
                  className="w-full bg-white text-gray-700 py-2 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>
                <Link
                  href="/products"
                  className="block text-center text-amber-600 hover:text-amber-700 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
