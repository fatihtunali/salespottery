#!/usr/bin/env node

/**
 * Script to add World Set products to the database
 * Each country in the World Set collection will be added as a product
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function addWorldSetProducts() {
  console.log('🌍 Adding World Set products...\n');

  // Load environment variables manually
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        process.env[key] = value;
      }
    });
  }

  const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };

  let connection;

  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to database\n');

    // Check if World Set category exists
    const [categories] = await connection.query(
      "SELECT * FROM categories WHERE slug = 'world-set'"
    );

    let categoryId;

    if (categories.length === 0) {
      // Create World Set category
      console.log('Creating World Set category...');
      const [result] = await connection.query(
        `INSERT INTO categories (name, slug, description, display_order, is_active)
         VALUES (?, ?, ?, ?, ?)`,
        [
          'World Set',
          'world-set',
          'Country-themed ceramic collection featuring designs inspired by different nations',
          10,
          1
        ]
      );
      categoryId = result.insertId;
      console.log('✅ World Set category created (ID: ' + categoryId + ')\n');
    } else {
      categoryId = categories[0].id;
      console.log('✅ World Set category already exists (ID: ' + categoryId + ')\n');
    }

    // Define products for each country
    const countries = [
      {
        name: 'France Collection',
        slug: 'france-collection',
        description: 'Elegant French-inspired ceramic pieces featuring iconic Eiffel Tower and French cultural motifs',
        material: 'Premium Ceramic',
        color: 'Blue and White',
        images: [
          '/images/products/world set/France.jpg',
          '/images/products/world set/France 1.jpg'
        ]
      },
      {
        name: 'Holland Collection',
        slug: 'holland-collection',
        description: 'Dutch-themed ceramics featuring traditional windmill designs and tulip motifs',
        material: 'Premium Ceramic',
        color: 'Blue and White',
        images: [
          '/images/products/world set/HOLLAND.jpg',
          '/images/products/world set/HOLLAND 1.jpg'
        ]
      },
      {
        name: 'Italy Collection',
        slug: 'italy-collection',
        description: 'Italian-inspired ceramic collection with Mediterranean patterns and iconic Italian landmarks',
        material: 'Premium Ceramic',
        color: 'Multi-color',
        images: [
          '/images/products/world set/ITALY.jpg',
          '/images/products/world set/ITALY 1.jpg'
        ]
      },
      {
        name: 'Portugal Collection',
        slug: 'portugal-collection',
        description: 'Portuguese-inspired ceramics featuring traditional azulejo tile patterns and coastal themes',
        material: 'Premium Ceramic',
        color: 'Blue and White',
        images: [
          '/images/products/world set/PORTEKIZ.jpg',
          '/images/products/world set/PORTEKIZ 1.jpg'
        ]
      },
      {
        name: 'Spain Collection',
        slug: 'spain-collection',
        description: 'Spanish-themed ceramic pieces with vibrant Mediterranean colors and traditional Spanish motifs',
        material: 'Premium Ceramic',
        color: 'Multi-color',
        images: [
          '/images/products/world set/SPAIN.jpg',
          '/images/products/world set/SPAIN 2.jpg'
        ]
      },
      {
        name: 'UK Collection',
        slug: 'uk-collection',
        description: 'British-inspired ceramic collection featuring iconic London landmarks and Union Jack patterns',
        material: 'Premium Ceramic',
        color: 'Red, White and Blue',
        images: [
          '/images/products/world set/UK.jpg',
          '/images/products/world set/UK 1.jpg'
        ]
      }
    ];

    console.log('Adding products...\n');

    for (const country of countries) {
      // Check if product already exists
      const [existing] = await connection.query(
        'SELECT id FROM products WHERE slug = ?',
        [country.slug]
      );

      let productId;

      if (existing.length > 0) {
        productId = existing[0].id;
        console.log(`⏭️  ${country.name} already exists (ID: ${productId})`);
      } else {
        // Generate SKU
        const sku = 'WS-' + country.slug.toUpperCase().replace(/-/g, '');

        // Insert product
        const [result] = await connection.query(
          `INSERT INTO products (
            sku, name, slug, description, category_id, base_price, currency,
            material, color, technique,
            is_dishwasher_safe, is_microwave_safe, is_food_safe,
            is_active, is_featured, is_handmade
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            sku,
            country.name,
            country.slug,
            country.description,
            categoryId,
            45.00, // Base wholesale price
            'EUR',
            country.material,
            country.color,
            'Hand-painted',
            true,
            true,
            true,
            true,
            true,
            true
          ]
        );

        productId = result.insertId;
        console.log(`✅ Created ${country.name} (ID: ${productId}, SKU: ${sku})`);

        // Add images
        for (let i = 0; i < country.images.length; i++) {
          await connection.query(
            `INSERT INTO product_images (product_id, image_url, display_order, is_primary)
             VALUES (?, ?, ?, ?)`,
            [productId, country.images[i], i, i === 0]
          );
        }
        console.log(`   📸 Added ${country.images.length} images`);

        // Add inventory
        await connection.query(
          `INSERT INTO inventory (product_id, quantity, reserved_quantity, low_stock_threshold)
           VALUES (?, ?, ?, ?)`,
          [productId, 200, 0, 50]
        );
        console.log(`   📦 Added inventory (200 units)\n`);
      }
    }

    console.log('\n🎉 World Set products added successfully!');
    console.log('\n📊 Summary:');
    console.log('   Category: World Set');
    console.log('   Products: ' + countries.length);
    console.log('   Total Images: ' + (countries.length * 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addWorldSetProducts();
