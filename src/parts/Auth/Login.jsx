import React from 'react';
import './Auth.css';

// Login page component
const Login = ({ onLogin, onSwitchToRegister }) => {
  // Handle form submission and validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username: e.target.username.value, password: e.target.password.value };
    data.username && data.password ? onLogin(data) : alert('Please fill in all fields');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input name="username" className="form-input" placeholder="Username" required />
          <input name="password" type="password" className="form-input" placeholder="Password" required />
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-footer-text">
          Don't have an account? <button onClick={onSwitchToRegister} className="auth-link">Register</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
