# SalesPottery - Handmade Pottery E-Commerce Platform

## Project Overview
Sales platform for handmade pottery products targeting European market. Built with Next.js and MySQL, focusing on custom product galleries, inventory management, and multi-currency support.

## Tech Stack
- **Frontend/Backend:** Next.js 16 (App Router) with TypeScript
- **Styling:** TailwindCSS 4
- **Database:** MySQL 8 with mysql2 (direct connection, no ORM)
- **Image Handling:** TBD (Cloudinary or Uploadthing)
- **Payment:** Stripe (multi-currency, EU VAT compliance)
- **Internationalization:** TBD (next-intl)

## Server Configuration
- **Droplet IP:** 134.209.137.11
- **System User:** salespottery
- **Database:** salespottery_db
- **DB User:** salespottery_user
- **Application Port:** 3005 (local and production)

## Git Repository
https://github.com/fatihtunali/salespottery

## Features Roadmap

### 1. Product Catalog with Image Galleries ✅ COMPLETED
- [x] Create products table schema
- [x] Create product_images table schema
- [x] Create categories table schema
- [x] Build product listing page with pagination
- [x] Build individual product detail page
- [x] Implement image gallery component with zoom
- [x] Add product search and filtering
- [x] Create API endpoints for products CRUD (GET endpoints complete)

### 2. Shopping Cart ✅ COMPLETED
- [x] Design cart data structure (session-based with DB)
- [x] Create cart context/state management
- [x] Build add to cart functionality
- [x] Build cart page with quantity management
- [x] Implement cart persistence (localStorage + MySQL)
- [x] Add cart icon with item count in header
- [x] Create cart API endpoints (GET, POST, PUT, DELETE)
- [x] Add quantity controls (increase/decrease)
- [x] Add remove item and clear cart functionality

### 3. Checkout with Manual Payment ✅ COMPLETED
- [x] Create orders table schema
- [x] Create order_items table schema
- [x] Build checkout form with customer information
- [x] Implement manual bank transfer payment system
- [x] Create payment instructions page
- [x] Create order confirmation page
- [x] Add order and order item TypeScript types
- [x] API endpoint for order creation
- [ ] Send order confirmation emails (TODO: Phase 4)

**Note**: Stripe was initially implemented but removed since it doesn't work in Turkey. Using manual bank transfer payment instead.

### 4. Admin Panel for Inventory
- [ ] Create admin authentication system
- [ ] Build admin dashboard layout
- [ ] Create product management (CRUD) interface
- [ ] Build inventory tracking system
- [ ] Add image upload for products
- [ ] Create order management interface
- [ ] Add sales analytics and reports

### 5. Multi-Currency Support
- [ ] Integrate currency conversion API
- [ ] Create currencies table
- [ ] Build currency selector component
- [ ] Update Stripe integration for multi-currency
- [ ] Handle VAT rates per EU country
- [ ] Display prices in selected currency throughout site

## Current Project Structure
```
salespottery/
├── app/
│   ├── api/
│   │   └── test-db/         # Database connection test endpoint
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── db.ts                # MySQL connection pool utility
├── .env.local               # Local environment (gitignored)
├── .env.production          # Production environment (gitignored)
├── .env.example             # Environment template
└── package.json             # Configured for port 3005
```

## Database Schema (To Be Created)

### Tables Needed:
1. **products** - Product information
2. **product_images** - Product image URLs
3. **categories** - Product categories
4. **orders** - Customer orders
5. **order_items** - Items in each order
6. **inventory** - Stock tracking
7. **currencies** - Supported currencies and rates
8. **admins** - Admin user accounts

## Development Workflow
1. Build feature locally on port 3005
2. Test database connection with remote MySQL
3. Commit changes to GitHub (avoid secrets)
4. Deploy to production server

## Environment Variables
```
DB_HOST - Database host (134.209.137.11 for local, localhost for production)
DB_PORT - MySQL port (3306)
DB_USER - Database user
DB_PASSWORD - Database password
DB_NAME - Database name (salespottery_db)
NODE_ENV - Environment (development/production)
NEXT_PUBLIC_APP_URL - Application URL
```

## Next Steps
- Start with Product Catalog database schema
- Create initial database tables
- Build product listing and detail pages

## Notes
- All passwords unified: Dlr235672.-Yt
- Focus on EU compliance (GDPR, VAT)
- Handmade pottery = unique pieces, inventory critical
- Multi-language support for European market
- add to memory
- memorize
- memorize this updates