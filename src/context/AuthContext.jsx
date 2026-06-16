import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on start
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/profile');
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (error) {
          console.error('Session validation failed:', error.message);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Register User
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        toast.success(`Welcome to CipherVault, ${res.data.user.name}!`);
        return res.data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Login User
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        toast.success(`Welcome back, ${res.data.user.name}!`);
        return res.data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid email or password.';
      toast.error(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Logout User
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully.');
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/auth/profile', profileData);
      if (res.data.success) {
        setUser(res.data.user);
        toast.success('Profile updated successfully!');
        return res.data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update profile.';
      toast.error(msg);
      throw new Error(msg);
    }
  };

  // Delete User Account
  const deleteAccount = async () => {
    try {
      // In the Settings page, we'll offer a delete option. Let's define the endpoint on the server too.
      // Wait, we didn't add the server endpoint route for delete account in our checklist, but we can call it.
      // Let's check: POST /api/auth/profile can be used, or we can add a delete route.
      // We can also just delete via DELETE /api/auth/profile or similar. Let's make sure it handles it or we delete the user from frontend/backend.
      // Let's implement delete user backend route if needed, or simply make a DELETE call to /api/auth/profile.
      // Yes, we will implement it in the authController and routes. Let's check if we need to. The user requested: Settings Page: Delete Account.
      // Let's write the delete logic in the auth controller and routes. Let's make sure we have a DELETE route in authRoutes.
      const res = await api.delete('/auth/profile');
      if (res.data.success) {
        logout();
        toast.success('Account permanently deleted.');
      }
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete account.';
      toast.error(msg);
      throw new Error(msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        updateProfile,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
