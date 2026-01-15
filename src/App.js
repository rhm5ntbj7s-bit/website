import React, { useState, useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import Nav from './parts/Navbar/nav';
import Products from './parts/Products/Products';
import Login from './parts/Auth/Login';
import Register from './parts/Auth/Register';
import Basket from './pages/Basket';
import Settings from './pages/Settings';
import './App.css';

function App() {
  // Get authentication functions and user data from context
  const { isAuthenticated, login, register, logout, user } = useAppContext();
  
  // State for view toggles and settings
  const [showRegister, setShowRegister] = useState(false);
  const [showBasket, setShowBasket] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');

  // Apply theme class to body element when theme changes
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }, [theme]);

  // Show login or register page if user is not authenticated
  if (!isAuthenticated) {
    return showRegister ? (
      <Register 
        onRegister={register}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login 
        onLogin={login}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  // Main app interface for authenticated users
  return (
    <div>
      {/* Navigation bar with user info and controls */}
      <Nav 
        user={user} 
        onLogout={logout} 
        onBasketClick={() => setShowBasket(!showBasket)}
        showBasket={showBasket}
        onAccountClick={() => setShowSettings(true)}
      />
      
      {/* Admin panel button (only visible to admins) */}
      {user?.isAdmin && (
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <button 
            onClick={() => setShowAdmin(!showAdmin)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            {showAdmin ? 'Hide' : 'Show'} Admin Panel
          </button>
          {showAdmin && (
            <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '10px auto', maxWidth: '600px', borderRadius: '8px' }}>
              <a 
                href="https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/databases/-default-/data" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#2196F3', fontSize: '1.1rem' }}
              >
                https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/databases/-default-/data
              </a>
            </div>
          )}
        </div>
      )}
      
      {/* Conditional rendering: Settings, Basket, or Products page */}
      {showSettings ? (
        <Settings 
          user={user}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          onBack={() => setShowSettings(false)}
        />
      ) : showBasket ? (
        <Basket />
      ) : (
        <Products />
      )}
    </div>
  );
}

export default App;
