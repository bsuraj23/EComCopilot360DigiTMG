import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productService, orderService } from '../services';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, ordersData] = await Promise.all([
        productService.getProducts(),
        orderService.getAllOrders()
      ]);
      setProducts(productsData.data);
      setOrders(ordersData.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !isAdmin) {
    return (
      <div className="container">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="container loading">Loading dashboard...</div>;
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  const lowStock = products.filter(product => product.stock < 10).length;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-value">{products.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-value">{orders.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Orders</h3>
            <p className="stat-value">{pendingOrders}</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p className="stat-value">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="stat-card alert">
            <h3>Low Stock Items</h3>
            <p className="stat-value">{lowStock}</p>
          </div>
        </div>

        <div className="admin-actions">
          <Link to="/admin/products" className="btn btn-primary">
            Manage Products
          </Link>
          <Link to="/admin/orders" className="btn btn-primary">
            Manage Orders
          </Link>
        </div>

        <div className="recent-section">
          <h2>Recent Orders</h2>
          <div className="recent-orders">
            {orders.slice(0, 5).map(order => (
              <div key={order._id} className="recent-order">
                <span>Order #{order._id.substring(0, 8)}</span>
                <span>{order.user?.name}</span>
                <span>${order.totalPrice.toFixed(2)}</span>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
