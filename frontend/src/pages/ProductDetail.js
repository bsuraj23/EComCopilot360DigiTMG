import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProduct(id);
        setProduct(data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <div className="container loading">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="container">
        <button onClick={() => navigate('/products')} className="btn btn-secondary">
          ← Back to Products
        </button>
        
        <div className="product-detail-content">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="product-info-section">
            <h1>{product.name}</h1>
            <div className="product-rating">
              {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
              <span>({product.numReviews} reviews)</span>
            </div>
            
            <p className="product-category">Category: {product.category}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-stock">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={product.stock === 0}
                />
              </div>
              
              <button
                className="btn btn-primary btn-large"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
