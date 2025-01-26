'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check authentication status on initial load and after any storage changes
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const userImage = localStorage.getItem('userImage');
        
        if (token && userName) {
          setUser({
            name: userName,
            email: userEmail,
            image: userImage,
            token: token
          });
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    // Check auth on mount
    checkAuth();

    // Listen for storage changes (helps with multiple tabs)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  const updateUser = (updatedUser) => {
    try {
      setUser(updatedUser);
      localStorage.setItem('userName', updatedUser.name);
      localStorage.setItem('userEmail', updatedUser.email);
      if (updatedUser.image) {
        localStorage.setItem('userImage', updatedUser.image);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const login = (userData) => {
    try {
      const userInfo = {
        name: userData.user?.name || userData.name,
        email: userData.user?.email || userData.email,
        image: userData.user?.image || userData.image,
        token: userData.token
      };
      
      if (userInfo.name && userInfo.token) {
        // Update state
        setUser(userInfo);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('token', userInfo.token);
        localStorage.setItem('userName', userInfo.name);
        if (userInfo.email) {
          localStorage.setItem('userEmail', userInfo.email);
        }
        if (userInfo.image) {
          localStorage.setItem('userImage', userInfo.image);
        }
        
        router.push('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Allow the login component to handle the error
    }
  };

  const logout = () => {
    try {
      // Clear state
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userImage');
      
      // Redirect to login
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

 
  // Don't render children until we've checked auth status
  if (loading) {
    return null; // Or a loading spinner component
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};