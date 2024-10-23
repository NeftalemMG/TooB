import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/admin/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="grid gap-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white p-4 rounded shadow">
            <h3>Order #{order._id}</h3>
            <p>${order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;