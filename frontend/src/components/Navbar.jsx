import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { items } = useCart();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="glass-strong sticky top-0 z-50 shadow-premium">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LuxeCart
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium group"
            >
              <span>Products</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl glass hover:shadow-glow transition-all duration-300 group overflow-hidden"
              aria-label="Toggle theme"
            >
              <div className="relative w-6 h-6">
                {/* Sun Icon - Shows in Dark Mode */}
                <svg 
                  className={`absolute inset-0 w-6 h-6 text-yellow-400 transition-all duration-500 ${
                    theme === 'dark' 
                      ? 'opacity-100 rotate-0 scale-100' 
                      : 'opacity-0 rotate-180 scale-0'
                  }`}
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
                
                {/* Moon Icon - Shows in Light Mode */}
                <svg 
                  className={`absolute inset-0 w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-all duration-500 ${
                    theme === 'light' 
                      ? 'opacity-100 rotate-0 scale-100' 
                      : 'opacity-0 -rotate-180 scale-0'
                  }`}
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === 'dark' 
                  ? 'bg-yellow-400/10' 
                  : 'bg-indigo-600/10'
              }`}></div>
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              className="relative p-2 rounded-xl glass hover:shadow-glow transition-all duration-300 group"
              aria-label="Profile"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative px-4 py-2 glass hover:shadow-glow transition-all duration-300 rounded-xl group"
            >
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
