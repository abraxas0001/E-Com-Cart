# 🛍️ LuxeCart - Premium E-Commerce Platform

A stunning full-stack e-commerce shopping cart application built with React and Node.js, featuring a beautiful glass morphism UI, dark mode support, and smooth animations. Experience a modern, premium shopping interface with complete cart management and checkout functionality.

## 🎯 Project Overview

LuxeCart is a fully functional e-commerce platform that delivers a premium shopping experience. Built with modern web technologies, it features a beautiful glass morphism design, dark mode support, smooth animations, and complete e-commerce functionality including product browsing, cart management, checkout processing, and data persistence.

### ✨ Key Highlights
- 🎨 **Premium Glass Morphism UI** - Modern, elegant design with frosted glass effects
- 🌓 **Dark Mode Support** - Seamless theme switching with beautiful gradients
- ✨ **Smooth Animations** - Framer Motion powered transitions and interactions
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop
- 🚀 **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🧪 **Well Tested** - Comprehensive test suite with property-based testing

## 🛠 Tech Stack

### Frontend
- **React 18+** - Modern UI library with hooks
- **Vite** - Next-generation frontend tooling
- **React Router v6** - Declarative routing
- **Framer Motion** - Production-ready animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client
- **Context API** - State management
- **Custom Hooks** - Reusable logic (useReducedMotion, etc.)

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js 4.x** - Fast, minimalist web framework
- **SQLite3** - Embedded SQL database
- **better-sqlite3** - Synchronous SQLite driver
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Testing & Quality
- **Jest** - Delightful JavaScript testing
- **Supertest** - HTTP assertion library
- **fast-check** - Property-based testing
- **21 Passing Tests** - Comprehensive coverage

## 📁 Project Structure

```
mock-ecom-cart/
├── backend/
│   ├── __tests__/          # Test files
│   ├── controllers/        # Request handlers
│   ├── db/                 # Database initialization and queries
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic
│   ├── server.js           # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/           # API client functions
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with:
```
PORT=3001
DATABASE_PATH=./database.sqlite
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

The server will start on `http://localhost:3001` and automatically:
- Initialize the SQLite database
- Create necessary tables
- Seed 10 mock products

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with:
```
VITE_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📡 API Endpoints

### Products
- `GET /api/products` - Retrieve all products

### Cart
- `POST /api/cart` - Add item to cart
  - Body: `{ "productId": 1, "quantity": 2 }`
- `GET /api/cart` - Get cart contents with total
- `PUT /api/cart/:id` - Update cart item quantity
  - Body: `{ "quantity": 3 }`
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout
  - Body: `{ "name": "John Doe", "email": "john@example.com" }`
  - Returns: Receipt with order details and timestamp

### Example API Responses

**GET /api/products**
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 59.99,
    "image": "https://images.unsplash.com/..."
  }
]
```

**GET /api/cart**
```json
{
  "items": [
    {
      "id": 1,
      "productId": 1,
      "name": "Wireless Headphones",
      "price": 59.99,
      "quantity": 2,
      "lineTotal": 119.98
    }
  ],
  "total": 119.98
}
```

**POST /api/checkout**
```json
{
  "customerName": "John Doe",
  "email": "john@example.com",
  "total": 119.98,
  "timestamp": "2025-12-02T16:38:04.888Z",
  "items": [...]
}
```

## 🏗 Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React)                │
│  - Product browsing                     │
│  - Cart management                      │
│  - Checkout flow                        │
│  - Responsive UI                        │
└─────────────────────────────────────────┘
                  │
                  │ HTTP/REST
                  ▼
┌─────────────────────────────────────────┐
│      Backend (Node.js/Express)          │
│  - RESTful API                          │
│  - Business logic                       │
│  - Input validation                     │
│  - Error handling                       │
└─────────────────────────────────────────┘
                  │
                  │ SQL
                  ▼
┌─────────────────────────────────────────┐
│         Database (SQLite)               │
│  - Product catalog                      │
│  - Cart persistence                     │
└─────────────────────────────────────────┘
```

## ✨ Features

### 🎨 Premium UI/UX
- **Glass Morphism Design** - Frosted glass effects with backdrop blur
- **Dark Mode** - Beautiful dark theme with purple/blue gradients
- **Smooth Animations** - Page transitions, hover effects, and micro-interactions
- **Gradient Text** - Eye-catching gradient headings and accents
- **Premium Shadows** - Layered shadows for depth and elevation
- **Responsive Layout** - Optimized for all screen sizes

### 🛒 Product Catalog
- Browse 930+ products with high-quality images
- Category filtering (Electronics, Fashion, Home & Garden, Sports, Books, Toys)
- Featured products section
- Responsive grid layout (1-4 columns based on screen size)
- Smooth scroll to categories
- Product cards with hover effects

### 🛍️ Shopping Cart
- Real-time cart updates with animations
- Quantity management with +/- controls
- Remove items with confirmation
- Live total calculation
- Cart badge with item count
- Empty cart state with call-to-action
- Persistent cart storage
- Glass morphism cart items

### 💳 Checkout Experience
- Multi-step checkout form
- Real-time form validation
- Order summary with itemized list
- Customer information collection
- Beautiful receipt modal
- Success animations
- Cart clearing after checkout

### 🎯 Additional Features
- **Theme Toggle** - Switch between light and dark modes
- **User Profile** - Currency and locale preferences
- **Toast Notifications** - Success/error feedback
- **Loading States** - Skeleton screens and spinners
- **Back to Top** - Smooth scroll button
- **Error Handling** - User-friendly error messages
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized images and lazy loading

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

**Test Coverage:**
- 21 passing tests
- Product API tests
- Cart operations tests
- Checkout flow tests
- Error handling tests
- Property-based tests

### Test Results
```
Test Suites: 3 passed, 3 total
Tests:       21 passed, 21 total
```

## 🔒 Security Considerations

While this is a mock application, basic security practices are implemented:
- Input validation on all endpoints
- SQL injection prevention (parameterized queries)
- XSS prevention (React's built-in escaping)
- CORS configuration
- Environment variables for configuration
- Proper error handling without exposing internals

## 🎨 Design Features

### Visual Design
- **Glass Morphism** - Frosted glass cards with backdrop blur
- **Gradient Backgrounds** - Smooth color transitions (blue → purple → pink)
- **Premium Typography** - Bold gradient text for headings
- **Micro-interactions** - Hover effects, scale transforms, and glow effects
- **Consistent Spacing** - Harmonious layout with proper whitespace
- **Icon System** - Heroicons for consistent iconography

### Color Palette
- **Primary**: Blue (600) → Purple (600) gradients
- **Accent**: Pink (500) → Purple (500)
- **Success**: Green (600)
- **Dark Mode**: Gray (900) → Purple (900) backgrounds
- **Glass Effects**: Semi-transparent with backdrop blur

### Animation System
- **Page Transitions** - Smooth fade and slide effects
- **Staggered Animations** - Sequential item reveals
- **Hover States** - Scale, glow, and color transitions
- **Loading States** - Skeleton screens and spinners
- **Reduced Motion** - Respects user preferences

## 🚧 Future Enhancements

Potential improvements for future versions:
- 🔐 User authentication and accounts
- 🔍 Advanced product search with filters
- ⭐ Product reviews and ratings
- 📦 Order history and tracking
- 💰 Real payment gateway integration (Stripe/PayPal)
- 👨‍💼 Admin dashboard for product management
- 📊 Analytics and reporting
- 🌍 Multi-language support
- 📧 Email notifications
- 🎁 Wishlist functionality
- 🏷️ Discount codes and promotions
- 📱 Progressive Web App (PWA)

## 📝 Environment Variables

### Backend (.env)
```
PORT=3001
DATABASE_PATH=./database.sqlite
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your own use.

## 📄 License

MIT License - feel free to use this project for learning and demonstration purposes.

## 👨‍💻 Development

### Backend Development
```bash
cd backend
npm run dev  # Start with auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Start Vite dev server
```

### Build for Production
```bash
cd frontend
npm run build  # Creates optimized production build
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3001 or 5173 is already in use, you can:
- Change the PORT in backend/.env
- Change the port in frontend/vite.config.js
- Kill the process using the port

### Database Issues
If you encounter database issues:
- Delete `backend/database.sqlite`
- Restart the backend server (it will recreate the database)

### CORS Errors
Ensure:
- Backend is running on port 3001
- Frontend VITE_API_URL points to http://localhost:3001
- CORS is enabled in backend/server.js

## 📞 Support

For issues or questions, please check:
1. All dependencies are installed
2. Both backend and frontend servers are running
3. Environment variables are correctly configured
4. Ports 3001 and 5173 are available

## 🌟 Live Demo

**🚀 [Visit LuxeCart Live Demo](https://e-com-cart-orpin.vercel.app/)**

Experience the premium shopping interface with glass morphism design and dark mode!

## 📸 Screenshots

### 📱 Mobile Experience
<div align="center">
  <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=800&fit=crop" alt="Premium Mobile Shopping Experience" width="300"/>
  <p><em>Premium mobile shopping experience with glass morphism design</em></p>
</div>

> **Smartphone Max 2** - Experience seamless shopping with our responsive design optimized for all devices. Features include smooth animations, glass morphism effects, and intuitive navigation.

### 💻 Desktop Views

#### Light Mode
- ✨ Hero section with gradient background
- 🛍️ Product grid with glass morphism cards
- 🛒 Cart page with order summary
- 💳 Checkout form with validation
- 🎨 Clean, modern interface

#### Dark Mode
- 🌙 Beautiful dark gradients
- 💎 Glass effects with dark backdrop
- 💜 Purple/blue color scheme
- ✨ Consistent theming throughout
- 🎯 Enhanced readability

### Key Features Showcase
- 🎨 **Glass Morphism**: Frosted glass effects throughout
- 🌓 **Theme Toggle**: Seamless light/dark mode switching
- ✨ **Smooth Animations**: Framer Motion powered transitions
- 📱 **Responsive**: Perfect on all devices
- 🚀 **Fast**: Lightning-fast Vite builds

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Abraxas**
- GitHub: [@abraxas0001](https://github.com/abraxas0001)
- Repository: [E-Com-Cart](https://github.com/abraxas0001/E-Com-Cart)

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons from Heroicons
- Design inspiration from modern e-commerce platforms
- Built with love using React, Node.js, and Tailwind CSS

---

**⭐ If you like this project, please give it a star on GitHub! ⭐**

**Built with ❤️ using React, Node.js, Framer Motion, and Tailwind CSS**
