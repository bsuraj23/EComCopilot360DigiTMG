import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { getAllOrders, updateOrderStatus } from '../services/api';
import * as api from '../services/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    stock: '',
    image: 'https://via.placeholder.com/300',
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const data = await api.getProducts();
        setProducts(data);
      } else if (activeTab === 'orders') {
        const data = await getAllOrders();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createProduct(productForm);
      setShowForm(false);
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: 'Electronics',
        stock: '',
        image: 'https://via.placeholder.com/300',
      });
      fetchData();
    } catch (err) {
      alert('Failed to create product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        fetchData();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchData();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0' }}>Admin Dashboard</h1>

      <div style={{ marginBottom: '2rem' }}>
        <button
          className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('products')}
          style={{ marginRight: '1rem' }}
        >
          Products
        </button>
        <button
          className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
            style={{ marginBottom: '1rem' }}
          >
            {showForm ? 'Cancel' : 'Add New Product'}
          </button>

          {showForm && (
            <form onSubmit={handleProductSubmit} className="form-container">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Sports">Sports</option>
                  <option value="Toys">Toys</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">Create Product</button>
            </form>
          )}

          <div style={{ marginTop: '2rem' }}>
            <table style={{ width: '100%', background: 'white', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Stock</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>{product.name}</td>
                    <td style={{ padding: '1rem' }}>{product.category}</td>
                    <td style={{ padding: '1rem' }}>${product.price.toFixed(2)}</td>
                    <td style={{ padding: '1rem' }}>{product.stock}</td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <table style={{ width: '100%', background: 'white', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Customer</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>#{order._id.slice(-8)}</td>
                  <td style={{ padding: '1rem' }}>{order.user?.name || 'N/A'}</td>
                  <td style={{ padding: '1rem' }}>${order.totalPrice.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>{order.orderStatus}</td>
                  <td style={{ padding: '1rem' }}>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                      style={{ padding: '0.5rem' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
