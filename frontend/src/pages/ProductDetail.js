import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { getProductById, addToCart } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await addToCart(product._id, quantity);
      setMessage('Added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to add to cart');
    }
  };

  if (loading) return <Loading />;
  if (!product) return <div className="container"><h2>Product not found</h2></div>;

  return (
    <div className="container">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem', 
        margin: '2rem 0',
        background: 'white',
        padding: '2rem',
        borderRadius: '8px'
      }}>
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: '1.5rem', color: '#27ae60', margin: '1rem 0' }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ marginBottom: '1rem' }}>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
          
          {message && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          {product.stock > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <label style={{ marginRight: '1rem' }}>Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: '80px', padding: '0.5rem' }}
              />
              <button 
                className="btn btn-primary" 
                onClick={handleAddToCart}
                style={{ marginLeft: '1rem' }}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
