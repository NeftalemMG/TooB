import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from '../api/axios';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get('orderId');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('No order ID provided');
        return;
      }

      try {
        console.log('Fetching order with ID:', orderId);
        const response = await axios.get(`/orders/${orderId}`);
        console.log('Order data received:', response.data);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to fetch order details');
      }
    };

    fetchOrder();
  }, [orderId]);

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!order) {
    return <div className="text-center mt-8">Loading order details... (Order ID: {orderId})</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Order Confirmation</h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold text-green-600 mb-2">Thank you for your order!</p>
          <p className="text-gray-600">Your order has been successfully placed and is being processed.</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Order Details</h2>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Items</h2>
          <ul>
            {order.items.map((item) => (
              <li key={item._id} className="flex justify-between items-center mb-2">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <Link to="/products" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;