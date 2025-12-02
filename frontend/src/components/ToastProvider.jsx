import { Toaster } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const ToastProvider = () => {
  const { isDark } = useTheme();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark 
            ? 'rgba(31, 41, 55, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          color: isDark ? '#f3f4f6' : '#1f2937'
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff'
          }
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff'
          }
        }
      }}
    />
  );
};

export default ToastProvider;
