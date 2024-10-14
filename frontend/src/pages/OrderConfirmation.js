import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import axios from '../api/axios';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const searchParams = new URLSearchParams(location.search);
      const sessionId = searchParams.get('session_id');

      if (!sessionId) {
        setError('No order information found.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`/payment/order-details?session_id=${sessionId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details. Please try again.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-sand-100 text-earth-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Order Confirmation</h1>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Thank you for your purchase!</h2>
            <p className="text-lg">Your order has been successfully placed and is being processed.</p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Items Purchased</h3>
            {order.products.map((item) => (
              <div key={item._id} className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/">
              <Button size="lg" className="bg-earth-800 text-white hover:bg-earth-900">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;