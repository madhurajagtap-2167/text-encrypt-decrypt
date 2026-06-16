import React from 'react';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* App Routes */}
        <AppRoutes />
        
        {/* Toast Notification Mount */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#1E293B',
              color: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '13px',
              fontFamily: 'Outfit, sans-serif'
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#FFFFFF'
              }
            },
            error: {
              style: {
                background: '#FEF2F2',
                color: '#991B1B',
                border: '1px solid #FCA5A5'
              }
            }
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
