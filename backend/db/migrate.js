import { db } from './init.js';

/**
 * Add new columns to products table if they don't exist
 */
export function migrateProductsTable() {
  try {
    // Check if columns exist by trying to select them
    try {
      db.prepare('SELECT category, description, stock, rating FROM products LIMIT 1').get();
      console.log('Products table already has new columns');
      return;
    } catch (error) {
      // Columns don't exist, add them
      console.log('Adding new columns to products table...');
      
      db.exec(`
        ALTER TABLE products ADD COLUMN category TEXT DEFAULT 'General';
      `);
      
      db.exec(`
        ALTER TABLE products ADD COLUMN description TEXT DEFAULT '';
      `);
      
      db.exec(`
        ALTER TABLE products ADD COLUMN stock INTEGER DEFAULT 50;
      `);
      
      db.exec(`
        ALTER TABLE products ADD COLUMN rating REAL DEFAULT 4.0;
      `);
      
      console.log('Successfully added new columns to products table');
    }
  } catch (error) {
    console.error('Migration error:', error.message);
  }
}

// Run migration
migrateProductsTable();
