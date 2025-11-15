import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>ECommerce Store</h1>
          </Link>
          
          <nav className="nav">
            <Link to="/products" className="nav-link">Products</Link>
            
            {user ? (
              <>
                <Link to="/cart" className="nav-link cart-link">
                  Cart {getTotalItems() > 0 && <span className="badge">{getTotalItems()}</span>}
                </Link>
                <Link to="/orders" className="nav-link">My Orders</Link>
                {isAdmin && (
                  <Link to="/admin" className="nav-link">Admin</Link>
                )}
                <span className="nav-link">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/cart" className="nav-link cart-link">
                  Cart {getTotalItems() > 0 && <span className="badge">{getTotalItems()}</span>}
                </Link>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
