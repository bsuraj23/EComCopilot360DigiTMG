import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { getOrderById, updateOrderToPaid } from '../services/api';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrder();
  }, [id, user, navigate]);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const paymentResult = {
        id: 'PAYMENT_' + Date.now(),
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: user.email,
      };
      await updateOrderToPaid(order._id, paymentResult);
      fetchOrder();
      alert('Payment successful!');
    } catch (err) {
      alert('Payment failed');
    }
  };

  if (loading) return <Loading />;
  if (!order) return <div className="container"><h2>Order not found</h2></div>;

  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0' }}>Order Details</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h2>Order #{order._id.slice(-8)}</h2>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Status: <strong>{order.orderStatus}</strong></p>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3>Shipping Address</h3>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3>Order Items</h3>
            {order.orderItems.map((item) => (
              <div key={item._id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '1rem 0',
                borderBottom: '1px solid #eee' 
              }}>
                <div>
                  <p><strong>{item.name}</strong></p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="order-summary">
            <h3>Payment Summary</h3>
            <div className="order-summary-item">
              <span>Payment Method:</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="order-summary-item">
              <span>Payment Status:</span>
              <span>{order.isPaid ? 'Paid' : 'Not Paid'}</span>
            </div>
            <div className="order-total">
              <span>Total:</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
            {!order.isPaid && (
              <button 
                className="btn btn-primary" 
                onClick={handlePayment}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
