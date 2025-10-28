#!/usr/bin/env node

/**
 * Migration Script: Transform E-commerce to Wholesale Catalog
 * Executes SQL migration using Node.js mysql2 library
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function runMigration() {
  console.log('🚀 Starting wholesale catalog migration...\n');

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
    database: process.env.DB_NAME,
    multipleStatements: true
  };

  let connection;

  try {
    // Create connection
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to database\n');

    // Read SQL file
    const sqlPath = path.join(__dirname, 'migrate-to-wholesale.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');

    // Execute migration
    console.log('📝 Executing migration script...\n');
    await connection.query(sqlScript);

    console.log('✅ Migration completed successfully!\n');
    console.log('Changes:');
    console.log('  ✓ Created: inquiries table');
    console.log('  ✓ Removed: cart, cart_items, orders, order_items tables\n');

    // Verify tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Remaining tables:');
    tables.forEach(table => {
      console.log('  -', Object.values(table)[0]);
    });

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigration();
