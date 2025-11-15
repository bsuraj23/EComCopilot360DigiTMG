import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
