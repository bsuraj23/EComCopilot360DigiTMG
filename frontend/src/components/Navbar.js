import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ cartItemCount = 0 }) => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/">
            <h1>🛒 E-Commerce Store</h1>
          </Link>
          <nav>
            <Link to="/">Home</Link>
            {user ? (
              <>
                <Link to="/cart">
                  Cart
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </Link>
                <Link to="/orders">My Orders</Link>
                {user.role === 'admin' && (
                  <Link to="/admin">Admin</Link>
                )}
                <Link to="/profile">Profile</Link>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
