import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>
                <span className="text-gray-600">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                {order.items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center py-2">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
              <div className="mt-4">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  order.status === 'paid' ? 'bg-green-100 text-green-800' : 
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;