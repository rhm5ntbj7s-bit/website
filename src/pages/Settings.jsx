import React from 'react';
import './Settings.css';

// Settings page for account info, theme, and language preferences
const Settings = ({ user, theme, setTheme, language, setLanguage, onBack }) => (
  <div className="settings-container">
    {/* Header with back button */}
    <div className="settings-header">
      <h1>Account Settings</h1>
      <button onClick={onBack} className="back-btn">Back</button>
    </div>
    <div className="settings-content">
      {/* Display user account information */}
      <div className="settings-section">
        <h2>Account Information</h2>
        <div className="account-info">
          <p><strong>Username:</strong> {user?.name || user?.username}</p>
          <p><strong>Member Status:</strong> {user?.isMember ? 'Premium Member' : 'Regular User'}</p>
        </div>
      </div>
      {/* Theme selection buttons */}
      <div className="settings-section">
        <h2>Theme</h2>
        <div className="theme-buttons">
          <button onClick={() => setTheme('light')} className={`theme-btn ${theme === 'light' ? 'active' : ''}`}>Light Mode</button>
          <button onClick={() => setTheme('dark')} className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}>Dark Mode</button>
        </div>
      </div>
      {/* Language dropdown selector */}
      <div className="settings-section">
        <h2>Language</h2>
        <div className="language-select">
          <select value={language} onChange={e => setLanguage(e.target.value)} className="language-dropdown">
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
