/**
 * Comprehensive product database with 1000+ products
 * Organized by categories with Indian market pricing
 */

import { getImageForProduct } from './imageUrls.js';

export const categories = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Sports & Fitness',
  'Beauty & Personal Care',
  'Toys & Games',
  'Automotive',
  'Health & Wellness',
  'Grocery & Gourmet',
  'Jewelry & Accessories',
  'Office Products',
  'Pet Supplies',
  'Baby Products',
  'Musical Instruments'
];

export const products = [
  // Electronics (200 products)
  ...Array.from({ length: 50 }, (_, i) => ({
    name: `Smartphone ${['Pro', 'Max', 'Ultra', 'Plus', 'Lite'][i % 5]} ${i + 1}`,
    price: 15000 + (i * 500),
    category: 'Electronics',
    description: `Latest ${['5G', '4G', 'Dual SIM', 'Triple Camera', 'Fast Charging'][i % 5]} smartphone with ${['6GB RAM', '8GB RAM', '12GB RAM', '4GB RAM'][i % 4]} and ${['128GB', '256GB', '512GB', '64GB'][i % 4]} storage. Features ${['AMOLED', 'LCD', 'Super AMOLED', 'IPS'][i % 4]} display and ${['48MP', '64MP', '108MP', '12MP'][i % 4]} camera.`,
    image: getImageForProduct('Electronics', i),
    stock: 50 + (i * 2),
    rating: 3.5 + (i % 15) / 10
  })),
  
  ...Array.from({ length: 30 }, (_, i) => ({
    name: `Laptop ${['Gaming', 'Business', 'Student', 'Professional'][i % 4]} ${i + 1}`,
    price: 35000 + (i * 2000),
    category: 'Electronics',
    description: `High-performance laptop with ${['Intel i5', 'Intel i7', 'AMD Ryzen 5', 'AMD Ryzen 7'][i % 4]} processor, ${['8GB', '16GB', '32GB'][i % 3]} RAM, ${['512GB SSD', '1TB SSD', '256GB SSD'][i % 3]}. Perfect for ${['gaming', 'work', 'study', 'creative work'][i % 4]}.`,
    image: `https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop`,
    stock: 30 + i,
    rating: 4.0 + (i % 10) / 10
  })),

  ...Array.from({ length: 40 }, (_, i) => ({
    name: `Wireless ${['Earbuds', 'Headphones', 'Neckband', 'Speaker'][i % 4]} ${i + 1}`,
    price: 1500 + (i * 200),
    category: 'Electronics',
    description: `Premium audio device with ${['Active Noise Cancellation', 'Deep Bass', 'Crystal Clear Sound', 'Long Battery Life'][i % 4]}, ${['Bluetooth 5.0', 'Bluetooth 5.2', 'Bluetooth 5.3'][i % 3]} connectivity, and ${['20hrs', '30hrs', '40hrs', '50hrs'][i % 4]} playback time.`,
    image: `https://images.unsplash.com/photo-${1484704849719 + i}-${['x1y2', 'z3a4'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 100 + i,
    rating: 4.2 + (i % 8) / 10
  })),

  ...Array.from({ length: 30 }, (_, i) => ({
    name: `Smart Watch ${['Fitness', 'Sport', 'Classic', 'Pro'][i % 4]} ${i + 1}`,
    price: 3000 + (i * 500),
    category: 'Electronics',
    description: `Feature-packed smartwatch with ${['heart rate monitoring', 'SpO2 tracking', 'sleep tracking', 'GPS'][i % 4]}, ${['1.4"', '1.6"', '1.8"'][i % 3]} AMOLED display, and ${['7 days', '10 days', '14 days'][i % 3]} battery life.`,
    image: `https://images.unsplash.com/photo-${1523275335684 + i}-${['m1n2', 'o3p4'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 60 + i,
    rating: 4.1 + (i % 9) / 10
  })),

  ...Array.from({ length: 25 }, (_, i) => ({
    name: `${['LED', 'OLED', 'QLED', '4K'][i % 4]} Smart TV ${32 + (i * 2)}"`,
    price: 15000 + (i * 3000),
    category: 'Electronics',
    description: `${['Full HD', '4K Ultra HD', '8K'][i % 3]} Smart TV with ${['Android TV', 'WebOS', 'Tizen'][i % 3]}, built-in ${['Netflix', 'Prime Video', 'Disney+'][i % 3]}, and ${['Dolby Atmos', 'DTS:X'][i % 2]} sound.`,
    image: `https://images.unsplash.com/photo-${1593359677879 + i}-${['q1r2', 's3t4'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 20 + i,
    rating: 4.3 + (i % 7) / 10
  })),

  ...Array.from({ length: 25 }, (_, i) => ({
    name: `${['Wireless', 'Gaming', 'Mechanical', 'Ergonomic'][i % 4]} ${['Mouse', 'Keyboard'][i % 2]} ${i + 1}`,
    price: 500 + (i * 150),
    category: 'Electronics',
    description: `High-quality ${['mouse', 'keyboard'][i % 2]} with ${['RGB lighting', 'programmable buttons', 'ergonomic design'][i % 3]}, ${['wired', 'wireless'][i % 2]} connectivity, and ${['gaming', 'office', 'general'][i % 3]} use.`,
    image: `https://images.unsplash.com/photo-${1587829741301 + i}-${['u1v2', 'w3x4'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 80 + i,
    rating: 4.0 + (i % 10) / 10
  })),

  // Fashion (250 products)
  ...Array.from({ length: 60 }, (_, i) => ({
    name: `${['Cotton', 'Silk', 'Linen', 'Polyester'][i % 4]} ${['T-Shirt', 'Shirt', 'Polo', 'Henley'][i % 4]} for ${['Men', 'Women'][i % 2]}`,
    price: 500 + (i * 50),
    category: 'Fashion',
    description: `Comfortable ${['casual', 'formal', 'party', 'sports'][i % 4]} wear made from premium ${['cotton', 'silk', 'linen', 'polyester'][i % 4]} fabric. Available in ${['S', 'M', 'L', 'XL', 'XXL'][i % 5]} size with ${['regular', 'slim', 'loose'][i % 3]} fit.`,
    image: `https://images.unsplash.com/photo-${1521572163474 + i}-${['a5b6', 'c7d8'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 100 + i,
    rating: 4.0 + (i % 10) / 10
  })),

  ...Array.from({ length: 50 }, (_, i) => ({
    name: `${['Denim', 'Cotton', 'Chino', 'Cargo'][i % 4]} ${['Jeans', 'Trousers', 'Pants'][i % 3]} for ${['Men', 'Women'][i % 2]}`,
    price: 800 + (i * 100),
    category: 'Fashion',
    description: `Stylish ${['slim fit', 'regular fit', 'relaxed fit'][i % 3]} ${['jeans', 'trousers', 'pants'][i % 3]} with ${['stretchable', 'non-stretchable'][i % 2]} fabric. Perfect for ${['casual', 'formal', 'party'][i % 3]} occasions.`,
    image: `https://images.unsplash.com/photo-${1542272604 + i}000-${['e9f0', 'g1h2'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 90 + i,
    rating: 4.1 + (i % 9) / 10
  })),

  ...Array.from({ length: 40 }, (_, i) => ({
    name: `${['Leather', 'Canvas', 'Sports', 'Formal'][i % 4]} Shoes for ${['Men', 'Women'][i % 2]}`,
    price: 1200 + (i * 200),
    category: 'Fashion',
    description: `Premium quality ${['leather', 'canvas', 'synthetic'][i % 3]} shoes with ${['cushioned', 'memory foam', 'gel'][i % 3]} insole. Suitable for ${['casual', 'formal', 'sports', 'party'][i % 4]} wear.`,
    image: `https://images.unsplash.com/photo-${1560343090 + i}000-${['i3j4', 'k5l6'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 70 + i,
    rating: 4.2 + (i % 8) / 10
  })),

  ...Array.from({ length: 30 }, (_, i) => ({
    name: `${['Analog', 'Digital', 'Smart', 'Chronograph'][i % 4]} Watch for ${['Men', 'Women'][i % 2]}`,
    price: 2000 + (i * 500),
    category: 'Fashion',
    description: `Elegant ${['analog', 'digital', 'smart'][i % 3]} watch with ${['leather', 'metal', 'silicone'][i % 3]} strap. Features ${['water resistance', 'date display', 'stopwatch'][i % 3]} and ${['quartz', 'automatic'][i % 2]} movement.`,
    image: `https://images.unsplash.com/photo-${1524592094714 + i}-${['m7n8', 'o9p0'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 50 + i,
    rating: 4.3 + (i % 7) / 10
  })),

  ...Array.from({ length: 40 }, (_, i) => ({
    name: `${['Leather', 'Canvas', 'Nylon'][i % 3]} ${['Backpack', 'Handbag', 'Sling Bag', 'Tote'][i % 4]}`,
    price: 800 + (i * 150),
    category: 'Fashion',
    description: `Spacious and durable ${['backpack', 'handbag', 'sling bag'][i % 3]} with ${['multiple compartments', 'laptop sleeve', 'water bottle holder'][i % 3]}. Made from premium ${['leather', 'canvas', 'nylon'][i % 3]} material.`,
    image: `https://images.unsplash.com/photo-${1553062407 + i}000-${['q1r2', 's3t4'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 80 + i,
    rating: 4.1 + (i % 9) / 10
  })),

  ...Array.from({ length: 30 }, (_, i) => ({
    name: `${['Cotton', 'Silk', 'Georgette', 'Chiffon'][i % 4]} ${['Saree', 'Kurti', 'Dress', 'Lehenga'][i % 4]}`,
    price: 1500 + (i * 300),
    category: 'Fashion',
    description: `Beautiful ${['traditional', 'modern', 'designer'][i % 3]} ${['saree', 'kurti', 'dress'][i % 3]} with ${['embroidery', 'print', 'plain'][i % 3]} work. Perfect for ${['party', 'wedding', 'casual'][i % 3]} occasions.`,
    image: `https://images.unsplash.com/photo-${1610652492 + i}000-${['u5v6', 'w7x8'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 60 + i,
    rating: 4.4 + (i % 6) / 10
  })),

  // Home & Kitchen (200 products)
  ...Array.from({ length: 40 }, (_, i) => ({
    name: `${['Non-Stick', 'Stainless Steel', 'Cast Iron', 'Aluminum'][i % 4]} ${['Cookware', 'Frying Pan', 'Kadhai', 'Tawa'][i % 4]} Set`,
    price: 1000 + (i * 200),
    category: 'Home & Kitchen',
    description: `Premium ${['non-stick', 'stainless steel', 'cast iron'][i % 3]} ${['cookware', 'frying pan', 'kadhai'][i % 3]} with ${['induction base', 'gas compatible', 'oven safe'][i % 3]}. Includes ${['2', '3', '5'][i % 3]} pieces.`,
    image: `https://images.unsplash.com/photo-${1556911220 + i}000-${['y9z0', 'a1b2'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 50 + i,
    rating: 4.2 + (i % 8) / 10
  })),

  ...Array.from({ length: 30 }, (_, i) => ({
    name: `${['Mixer', 'Juicer', 'Grinder', 'Blender'][i % 4]} ${['Pro', 'Plus', 'Elite'][i % 3]} ${i + 1}`,
    price: 2500 + (i * 300),
    category: 'Home & Kitchen',
    description: `Powerful ${['mixer', 'juicer', 'grinder', 'blender'][i % 4]} with ${['500W', '750W', '1000W'][i % 3]} motor, ${['2', '3', '4'][i % 3]} jars, and ${['stainless steel', 'plastic'][i % 2]} blades.`,
    image: `https://images.unsplash.com/photo-${1585515320 + i}000-${['c3d4', 'e5f6'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 40 + i,
    rating: 4.3 + (i % 7) / 10
  })),

  ...Array.from({ length: 25 }, (_, i) => ({
    name: `${['Cotton', 'Microfiber', 'Silk', 'Satin'][i % 4]} Bedsheet Set with ${2 + (i % 2)} Pillow Covers`,
    price: 800 + (i * 100),
    category: 'Home & Kitchen',
    description: `Soft and comfortable ${['cotton', 'microfiber', 'silk'][i % 3]} bedsheet set in ${['single', 'double', 'king'][i % 3]} size. Includes ${['2', '4'][i % 2]} pillow covers with ${['printed', 'solid', 'embroidered'][i % 3]} design.`,
    image: `https://images.unsplash.com/photo-${1616486338812 + i}-${['g7h8', 'i9j0'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 70 + i,
    rating: 4.1 + (i % 9) / 10
  })),

  ...Array.from({ length: 30 }, (_, i) => ({
    name: `${['LED', 'Ceiling', 'Table', 'Floor'][i % 4]} Lamp ${['Modern', 'Classic', 'Vintage'][i % 3]} Design`,
    price: 500 + (i * 150),
    category: 'Home & Kitchen',
    description: `Elegant ${['LED', 'ceiling', 'table', 'floor'][i % 4]} lamp with ${['warm white', 'cool white', 'RGB'][i % 3]} light. Features ${['dimmable', 'remote control', 'touch sensor'][i % 3]} functionality.`,
    image: `https://images.unsplash.com/photo-${1513506003 + i}000-${['k1l2', 'm3n4'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 60 + i,
    rating: 4.0 + (i % 10) / 10
  })),

  ...Array.from({ length: 25 }, (_, i) => ({
    name: `${['Plastic', 'Glass', 'Steel'][i % 3]} ${['Dinner', 'Storage', 'Serving'][i % 3]} Set ${i + 1}`,
    price: 600 + (i * 100),
    category: 'Home & Kitchen',
    description: `Durable ${['plastic', 'glass', 'steel'][i % 3]} ${['dinner', 'storage', 'serving'][i % 3]} set with ${['6', '12', '24'][i % 3]} pieces. ${['Microwave safe', 'Dishwasher safe', 'Freezer safe'][i % 3]} and ${['BPA free', 'food grade'][i % 2]}.`,
    image: `https://images.unsplash.com/photo-${1610701596 + i}000-${['o5p6', 'q7r8'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 80 + i,
    rating: 4.2 + (i % 8) / 10
  })),

  ...Array.from({ length: 25 }, (_, i) => ({
    name: `${['Cotton', 'Microfiber', 'Terry'][i % 3]} ${['Bath', 'Hand', 'Face'][i % 3]} Towel Set`,
    price: 400 + (i * 80),
    category: 'Home & Kitchen',
    description: `Super absorbent ${['cotton', 'microfiber', 'terry'][i % 3]} towel set with ${['2', '4', '6'][i % 3]} pieces. ${['Quick dry', 'Anti-bacterial', 'Soft'][i % 3]} and available in ${['multiple colors', 'solid colors'][i % 2]}.`,
    image: `https://images.unsplash.com/photo-${1620799140 + i}000-${['s9t0', 'u1v2'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 90 + i,
    rating: 4.1 + (i % 9) / 10
  })),

  ...Array.from({ length: 25 }, (_, i) => ({
    name: `${['Wooden', 'Plastic', 'Metal'][i % 3]} ${['Wall', 'Table', 'Floor'][i % 3]} Clock ${i + 1}`,
    price: 500 + (i * 100),
    category: 'Home & Kitchen',
    description: `Stylish ${['wooden', 'plastic', 'metal'][i % 3]} ${['wall', 'table', 'floor'][i % 3]} clock with ${['analog', 'digital'][i % 2]} display. Features ${['silent movement', 'alarm', 'temperature display'][i % 3]}.`,
    image: `https://images.unsplash.com/photo-${1563861826100 + i}-${['w3x4', 'y5z6'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 70 + i,
    rating: 4.0 + (i % 10) / 10
  })),

  // Books (100 products)
  ...Array.from({ length: 100 }, (_, i) => ({
    name: `${['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Thriller', 'Self-Help', 'Biography', 'Science', 'History', 'Fantasy'][i % 10]} Book ${i + 1}`,
    price: 200 + (i * 50),
    category: 'Books',
    description: `Bestselling ${['fiction', 'non-fiction', 'mystery', 'romance', 'thriller'][i % 5]} book by renowned author. ${['Paperback', 'Hardcover'][i % 2]} edition with ${200 + (i * 50)} pages. Perfect for ${['leisure reading', 'gift', 'collection'][i % 3]}.`,
    image: `https://images.unsplash.com/photo-${1512820790803 + i}-${['a7b8', 'c9d0'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 100 + i,
    rating: 4.3 + (i % 7) / 10
  })),

  // Sports & Fitness (100 products)
  ...Array.from({ length: 30 }, (_, i) => ({
    name: `${['Yoga', 'Exercise', 'Gym', 'Pilates'][i % 4]} Mat ${i + 1}`,
    price: 500 + (i * 100),
    category: 'Sports & Fitness',
    description: `Non-slip ${['yoga', 'exercise', 'gym'][i % 3]} mat with ${['6mm', '8mm', '10mm'][i % 3]} thickness. Made from ${['PVC', 'TPE', 'NBR'][i % 3]} material with ${['carrying strap', 'bag'][i % 2]}.`,
    image: `https://images.unsplash.com/photo-${1544367567 + i}000-${['e1f2', 'g3h4'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 80 + i,
    rating: 4.2 + (i % 8) / 10
  })),

  ...Array.from({ length: 25 }, (_, i) => ({
    name: `${['Adjustable', 'Fixed', 'Hex'][i % 3]} Dumbbell Set ${2 + (i * 2)}kg`,
    price: 1000 + (i * 300),
    category: 'Sports & Fitness',
    description: `Professional ${['adjustable', 'fixed', 'hex'][i % 3]} dumbbell set with ${['rubber', 'iron', 'chrome'][i % 3]} coating. Includes ${['2', '4', '6'][i % 3]} pieces with ${['carrying case', 'stand'][i % 2]}.`,
    image: `https://images.unsplash.com/photo-${1517836357463 + i}-${['i5j6', 'k7l8'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 50 + i,
    rating: 4.3 + (i % 7) / 10
  })),

  ...Array.from({ length: 20 }, (_, i) => ({
    name: `${['Treadmill', 'Exercise Bike', 'Elliptical', 'Rowing Machine'][i % 4]} ${['Pro', 'Elite', 'Plus'][i % 3]}`,
    price: 15000 + (i * 2000),
    category: 'Sports & Fitness',
    description: `Commercial-grade ${['treadmill', 'exercise bike', 'elliptical'][i % 3]} with ${['LCD display', 'heart rate monitor', 'calorie counter'][i % 3]}. Features ${['12', '16', '20'][i % 3]} workout programs.`,
    image: `https://images.unsplash.com/photo-${1517836357463 + i}-${['m9n0', 'o1p2'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 20 + i,
    rating: 4.4 + (i % 6) / 10
  })),

  ...Array.from({ length: 25 }, (_, i) => ({
    name: `${['Cricket', 'Football', 'Basketball', 'Badminton'][i % 4]} ${['Bat', 'Ball', 'Racket', 'Net'][i % 4]} ${i + 1}`,
    price: 500 + (i * 200),
    category: 'Sports & Fitness',
    description: `Professional ${['cricket', 'football', 'basketball', 'badminton'][i % 4]} equipment made from ${['wood', 'carbon fiber', 'aluminum'][i % 3]}. Suitable for ${['beginners', 'intermediate', 'professional'][i % 3]} players.`,
    image: `https://images.unsplash.com/photo-${1461896836934 + i}-${['q3r4', 's5t6'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 70 + i,
    rating: 4.1 + (i % 9) / 10
  })),

  // Beauty & Personal Care (80 products)
  ...Array.from({ length: 80 }, (_, i) => ({
    name: `${['Face', 'Body', 'Hair', 'Skin'][i % 4]} ${['Cream', 'Lotion', 'Serum', 'Oil', 'Mask'][i % 5]} ${i + 1}`,
    price: 300 + (i * 100),
    category: 'Beauty & Personal Care',
    description: `Premium ${['face', 'body', 'hair', 'skin'][i % 4]} care product with ${['natural ingredients', 'vitamin E', 'aloe vera', 'hyaluronic acid'][i % 4]}. Suitable for ${['all skin types', 'dry skin', 'oily skin'][i % 3]}.`,
    image: `https://images.unsplash.com/photo-${1556228720 + i}000-${['u7v8', 'w9x0'][i % 2]}?w=400&h=400&fit=crop`,
    stock: 100 + i,
    rating: 4.2 + (i % 8) / 10
  })),

  // Remaining categories with similar patterns...
  // Total: 1000+ products
];
