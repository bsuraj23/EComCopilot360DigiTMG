import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { getCart, updateCartItem, removeFromCart } from '../services/api';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const data = await updateCartItem(productId, newQuantity);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const data = await removeFromCart(productId);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0' }}>Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Your cart is empty</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div>
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                {item.product && (
                  <>
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="cart-item-info">
                      <h3>{item.product.name}</h3>
                      <p className="product-price">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleRemove(item.product._id)}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-summary-item">
              <span>Items:</span>
              <span>{cart.items.length}</span>
            </div>
            <div className="order-total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/checkout')}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
