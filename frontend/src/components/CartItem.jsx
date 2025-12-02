import { useState } from 'react';
import { useUser } from '../context/UserContext';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { formatPrice } = useUser();
  const [updating, setUpdating] = useState(false);

  const handleIncrement = async () => {
    setUpdating(true);
    try {
      await onUpdateQuantity(item.id, item.quantity + 1);
    } finally {
      setUpdating(false);
    }
  };

  const handleDecrement = async () => {
    setUpdating(true);
    try {
      await onUpdateQuantity(item.id, item.quantity - 1);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    setUpdating(true);
    try {
      await onRemove(item.id);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-4 md:p-6 shadow-premium hover:shadow-glow transition-all duration-300">
      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-purple-600 dark:text-purple-400">{formatPrice(item.price)}</span> each
            </p>
          </div>
          <button
            onClick={handleRemove}
            disabled={updating}
            className="p-2 glass rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 disabled:opacity-50 group"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={updating}
              className="w-9 h-9 flex items-center justify-center glass rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 disabled:opacity-50"
            >
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <div className="glass px-4 py-2 rounded-xl min-w-[50px] text-center">
              <span className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {item.quantity}
              </span>
            </div>
            
            <button
              onClick={handleIncrement}
              disabled={updating}
              className="w-9 h-9 flex items-center justify-center glass rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 disabled:opacity-50"
            >
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Total</p>
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formatPrice(item.lineTotal)}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center gap-6">
        {/* Product Info */}
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {item.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-purple-600 dark:text-purple-400">{formatPrice(item.price)}</span> each
          </p>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            disabled={updating}
            className="w-10 h-10 flex items-center justify-center glass rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 disabled:opacity-50"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          
          <div className="glass px-6 py-2 rounded-xl min-w-[60px] text-center">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {item.quantity}
            </span>
          </div>
          
          <button
            onClick={handleIncrement}
            disabled={updating}
            className="w-10 h-10 flex items-center justify-center glass rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 disabled:opacity-50"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-[120px]">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {formatPrice(item.lineTotal)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          disabled={updating}
          className="p-3 glass rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 disabled:opacity-50 group"
          aria-label="Remove item"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
