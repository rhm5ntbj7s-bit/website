import React from 'react';
import './nav.css';

// Navigation bar component with logo, links, and user controls
const Nav = ({ user, onLogout, onBasketClick, showBasket, onAccountClick }) => (
  <nav className="navbar">
    <div className="nav-container">
      {/* Site logo */}
      <div className="nav-logo">
        <img src="https://img.freepik.com/premium-vector/letter-t-logo-vector-art-icons-graphics_1278706-89031.jpg?semt=ais_hybrid&w=740&q=80" alt="Logo" style={{height: '40px'}} />
      </div>
      <ul className="nav-menu">
        {/* Home link */}
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        {/* User menu items (only shown when logged in) */}
        {user && (
          <>
            <li className="nav-item">
              <span className="nav-user" onClick={onAccountClick} style={{ cursor: 'pointer' }}>
                {user.isMember && <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3u5dBpgrTRdaCkKNxyrFT3YVmqtsTZal8nBwmQ2qAzA&s" style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} alt="Member" />}
                {user.name || user.username}
              </span>
            </li>
            <li className="nav-item">
              <button onClick={onBasketClick} className="nav-basket-btn">{showBasket ? 'Products' : 'Basket'}</button>
            </li>
            <li className="nav-item">
              <button onClick={onLogout} className="nav-logout-btn">Logout</button>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
);

export default Nav;
