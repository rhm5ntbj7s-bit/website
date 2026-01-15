import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Context Provider component
export const AppProvider = ({ children }) => {
  // Global state for user, authentication, and shopping basket
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [basket, setBasket] = useState([]);

  // Add product to basket or increment quantity if already exists
  const addToBasket = (product) => {
    setBasket(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove product from basket by ID
  const removeFromBasket = (productId) => {
    setBasket(prev => prev.filter(item => item.id !== productId));
  };

  // Update quantity of a product in basket (removes if quantity is 0 or less)
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromBasket(productId);
    setBasket(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  // Clear all items from basket
  const clearBasket = () => setBasket([]);

  // Log in user and save to localStorage
  const login = (userData) => {
    const userWithMember = { ...userData, isMember: true, isAdmin: true };
    setUser(userWithMember);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userWithMember));
  };

  // Register new user and save to localStorage
  const register = (userData) => {
    const newUser = {
      name: userData.name,
      isMember: userData.isMember || false
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Log out user and clear localStorage
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Check for existing user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // All values and functions available to components using this context
  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    basket,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
