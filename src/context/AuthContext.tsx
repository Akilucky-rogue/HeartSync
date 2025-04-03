
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  partnerId?: string;
  partnerName?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
      }
    }
    setLoading(false);
  }, []);

  // Mock login function (would connect to backend in a real app)
  const login = async (email: string, password: string) => {
    // Simulate API call
    setLoading(true);
    try {
      // In a real app, you'd validate against a real API
      if (email && password) {
        // Mock user for demonstration
        const mockUser: User = {
          id: '123',
          name: 'Demo User',
          email,
          partnerId: '456',
          partnerName: 'Partner Demo',
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would send data to your backend
      if (name && email && password) {
        const mockUser: User = {
          id: '123',
          name,
          email,
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return;
      }
      throw new Error('Registration failed');
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
