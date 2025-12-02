import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get database path from environment or use default
const dbPath = process.env.DATABASE_PATH || join(__dirname, '..', 'database.sqlite');

// Initialize database connection
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

/**
 * Initialize database schema
 * Creates tables if they don't exist
 */
export function initializeDatabase() {
  // Create products table with enhanced fields
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      category TEXT DEFAULT 'General',
      description TEXT DEFAULT '',
      stock INTEGER DEFAULT 50,
      rating REAL DEFAULT 4.0
    )
  `);

  // Create cart_items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  console.log('Database tables initialized');
}

/**
 * Seed products table with mock data
 */
export async function seedProducts() {
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get();
  
  if (count.count === 0) {
    const { products } = await import('./productData.js');
    
    const insert = db.prepare('INSERT INTO products (id, name, price, image, category, description, stock, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    
    const insertMany = db.transaction((products) => {
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        insert.run(
          i + 1,
          product.name,
          product.price,
          product.image,
          product.category || 'General',
          product.description || '',
          product.stock || 50,
          product.rating || 4.0
        );
      }
    });

    insertMany(products);
    console.log(`Products table seeded with ${products.length} items`);
  } else {
    console.log('Products table already contains data');
  }
}

/**
 * Setup database - initialize schema and seed data
 */
export async function setupDatabase() {
  initializeDatabase();
  await seedProducts();
}
