import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const CURRENCY_RATES = {
  INR: { symbol: '₹', rate: 1, name: 'Indian Rupee' },
  USD: { symbol: '$', rate: 0.012, name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.011, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.0095, name: 'British Pound' },
  JPY: { symbol: '¥', rate: 1.80, name: 'Japanese Yen' },
  CAD: { symbol: 'C$', rate: 0.016, name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', rate: 0.018, name: 'Australian Dollar' },
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure currency is INR by default
      if (!parsed.currency) {
        parsed.currency = 'INR';
      }
      return parsed;
    }
    return {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
      },
      currency: 'INR',
      avatar: null
    };
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(user));
  }, [user]);

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const updateAddress = (addressUpdates) => {
    setUser(prev => ({
      ...prev,
      address: { ...prev.address, ...addressUpdates }
    }));
  };

  const convertPrice = (priceInINR) => {
    // Prices are now in INR, convert to selected currency
    const rate = CURRENCY_RATES[user.currency]?.rate || 1;
    return priceInINR * rate;
  };

  const formatPrice = (priceInINR) => {
    const converted = convertPrice(priceInINR);
    const symbol = CURRENCY_RATES[user.currency]?.symbol || '₹';
    
    if (user.currency === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  const value = {
    user,
    updateUser,
    updateAddress,
    convertPrice,
    formatPrice,
    currencies: CURRENCY_RATES,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
