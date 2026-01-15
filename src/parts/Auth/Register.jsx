import React from 'react';
import './Auth.css';

// Registration page component
const Register = ({ onRegister, onSwitchToLogin }) => {
  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      isMember: e.target.isMember.checked
    };
    if (!data.name || !data.password || !data.confirmPassword) return alert('Please fill in all fields');
    if (data.password !== data.confirmPassword) return alert('Passwords do not match');
    if (data.password.length < 8) return alert('Password must be at least 8 characters');
    onRegister(data);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input name="name" className="form-input" placeholder="Username" required />
          <input name="password" type="password" className="form-input" placeholder="Password" required />
          <input name="confirmPassword" type="password" className="form-input" placeholder="Confirm Password" required />
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" name="isMember" />
            Member (10% discount)
          </label>
          <button type="submit" className="auth-button">Register</button>
        </form>
        <p className="auth-footer-text">
          Already have an account? <button onClick={onSwitchToLogin} className="auth-link">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
