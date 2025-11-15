import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to ECommerce Store</h1>
            <p>Discover amazing products at great prices</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Shop With Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🚚 Free Shipping</h3>
              <p>On orders over $50</p>
            </div>
            <div className="feature">
              <h3>💳 Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="feature">
              <h3>↩️ Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature">
              <h3>🎁 Great Deals</h3>
              <p>Amazing discounts daily</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
