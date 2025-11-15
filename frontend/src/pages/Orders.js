import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { getUserOrders } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: '#f39c12',
      Processing: '#3498db',
      Shipped: '#9b59b6',
      Delivered: '#27ae60',
      Cancelled: '#e74c3c',
    };
    return colors[status] || '#95a5a6';
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0' }}>My Orders</h1>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>No orders yet</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: 'white',
                padding: '1.5rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p style={{ color: '#7f8c8d' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      color: 'white',
                      backgroundColor: getStatusColor(order.orderStatus),
                      fontWeight: 'bold',
                    }}
                  >
                    {order.orderStatus}
                  </div>
                  <p style={{ marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    ${order.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <div>
                <p><strong>Items:</strong> {order.orderItems.length}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
