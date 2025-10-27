// Database Types

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  category_id: number;
  base_price: number;
  currency: string;

  // Dimensions
  height_cm: number | null;
  width_cm: number | null;
  depth_cm: number | null;
  weight_kg: number | null;

  // Pottery specific
  material: string | null;
  color: string | null;
  technique: string | null;
  is_dishwasher_safe: boolean;
  is_microwave_safe: boolean;
  is_food_safe: boolean;

  // Status
  is_active: boolean;
  is_featured: boolean;
  is_handmade: boolean;

  // SEO
  meta_title: string | null;
  meta_description: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  thumbnail_url: string | null;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: Date;
}

export interface Inventory {
  id: number;
  product_id: number;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  low_stock_threshold: number;
  restock_date: Date | null;
  last_restocked_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

// API Response Types
export interface ProductWithDetails extends Product {
  category: Category;
  images: ProductImage[];
  inventory: Inventory | null;
}

export interface ProductListItem extends Product {
  category_name: string;
  primary_image: string | null;
  available_quantity: number;
}

// Cart Types
export interface Cart {
  id: number;
  session_id: string;
  user_email: string | null;
  created_at: Date;
  updated_at: Date;
  expires_at: Date;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price_at_addition: number;
  created_at: Date;
  updated_at: Date;
}

export interface CartItemWithProduct extends CartItem {
  product: ProductListItem;
}

export interface CartWithItems extends Cart {
  items: CartItemWithProduct[];
  total: number;
  itemCount: number;
}

// Order Types
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: number;
  order_number: string;

  // Customer Information
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;

  // Shipping Address
  shipping_address_line1: string;
  shipping_address_line2: string | null;
  shipping_city: string;
  shipping_state: string | null;
  shipping_postal_code: string;
  shipping_country: string;

  // Billing Address
  billing_address_line1: string | null;
  billing_address_line2: string | null;
  billing_city: string | null;
  billing_state: string | null;
  billing_postal_code: string | null;
  billing_country: string | null;

  // Order Amounts
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  currency: string;

  // Stripe Information
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;

  // Order Status
  payment_status: PaymentStatus;
  order_status: OrderStatus;

  // Notes
  customer_notes: string | null;
  admin_notes: string | null;

  // Timestamps
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  product_sku: string;
  product_image: string | null;
  quantity: number;
  price_at_purchase: number;
  subtotal: number;
  created_at: Date;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}
