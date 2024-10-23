import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, Package, Calendar, CreditCard, Clock, ShoppingCart } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import TOOBLogo from '../components/TOOBLogo';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders/user');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch order history. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getOrderStatus = (order) => {
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return { status: 'Processing', color: 'text-amber-600' };
    if (diffDays < 3) return { status: 'Shipped', color: 'text-blue-600' };
    return { status: 'Delivered', color: 'text-green-600' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
          />
          <p className="mt-4 text-lg sm:text-xl font-semibold text-indigo-900">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="text-xl sm:text-2xl font-semibold text-red-600 mb-4">{error}</div>
          <Link
            to="/collections"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <Link to="/">
            <TOOBLogo width={120} height={48} className="mx-auto sm:w-[150px] sm:h-[60px]" />
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-2xl sm:text-3xl font-bold text-indigo-900"
          >
            Welcome back, {user?.name}
          </motion.h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Here's a summary of your shopping journey with us</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-6 bg-indigo-50">
            <div className="text-center p-3 sm:p-4">
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-indigo-600 mb-2" />
              <p className="text-lg sm:text-xl font-bold text-indigo-900">{orders.length}</p>
              <p className="text-xs sm:text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-indigo-600 mb-2" />
              <p className="text-lg sm:text-xl font-bold text-indigo-900">
                {orders.reduce((acc, order) => acc + order.products.length, 0)}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Items Purchased</p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-indigo-600 mb-2" />
              <p className="text-lg sm:text-xl font-bold text-indigo-900">
                ${orders.reduce((acc, order) => acc + order.totalAmount, 0).toFixed(2)}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Total Spent</p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-indigo-600 mb-2" />
              <p className="text-lg sm:text-xl font-bold text-indigo-900">
                {orders.length > 0 ? new Date(orders[0].createdAt).toLocaleDateString() : '-'}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Last Order</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-6">Order History</h2>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <ShoppingBag className="mx-auto h-16 w-16 text-indigo-400" />
                </motion.div>
                <h3 className="mt-4 text-lg sm:text-xl font-medium text-indigo-900">No orders yet</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600">Start your shopping journey with us</p>
                <div className="mt-6">
                  <Link
                    to="/collections"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 text-sm sm:text-base"
                  >
                    Explore Collections
                  </Link>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <motion.li 
                    key={order._id} 
                    className="py-4 sm:py-6"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Link 
                      to={`/order-confirmation?orderId=${order._id}`} 
                      className="block hover:bg-indigo-50 rounded-xl p-4 transition-colors duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                          <div className="flex items-center">
                            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 mr-2" />
                            <p className="text-sm sm:text-base font-medium text-indigo-900">
                              Order #{order._id.slice(-6)}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
                            <p className="text-xs sm:text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end">
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium ${getOrderStatus(order).color} bg-opacity-10`}>
                              {getOrderStatus(order).status}
                            </span>
                          </div>
                          <div className="flex items-center mt-2">
                            <p className="text-sm sm:text-base font-medium text-indigo-900">${order.totalAmount.toFixed(2)}</p>
                            <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center">
                          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
                          <p className="text-xs sm:text-sm text-gray-600">
                            {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderHistory;