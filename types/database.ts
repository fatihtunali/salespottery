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

// Inquiry Types for Wholesale
export type InquiryStatus = 'new' | 'contacted' | 'quoted' | 'closed';

export interface Inquiry {
  id: number;
  product_id: number;
  product_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  company_name: string | null;
  quantity: number;
  message: string | null;
  status: InquiryStatus;
  created_at: Date;
  updated_at: Date;
}

export interface InquiryWithProduct extends Inquiry {
  product: ProductListItem;
}

// Currency Types
export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  is_active: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ExchangeRate {
  id: number;
  currency_code: string;
  rate: number;
  updated_at: Date;
}

export interface VATRate {
  id: number;
  country_code: string;
  country_name: string;
  standard_rate: number;
  reduced_rate: number | null;
  is_eu: boolean;
  created_at: Date;
  updated_at: Date;
}
