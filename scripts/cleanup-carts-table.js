#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function cleanup() {
  console.log('🧹 Cleaning up carts table...\n');

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

    // Drop carts table
    await connection.query('DROP TABLE IF EXISTS carts');
    console.log('✅ Removed carts table\n');

  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

cleanup();
