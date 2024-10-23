import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Calendar } from 'lucide-react';
import TOOBLogo from '../components/TOOBLogo';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const searchParams = new URLSearchParams(location.search);
      const orderId = searchParams.get('orderId');
      
      if (!orderId) {
        setError('Order ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to fetch order details. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sand-100">
        <div className="text-2xl font-semibold text-earth-900">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sand-100">
        <div className="text-2xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    // <div className="min-h-screen bg-sand-100 py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-3xl mx-auto">
    //     <div className="text-center mb-12">
    //       <Link to="/">
    //         <TOOBLogo width={150} height={60} className="mx-auto" />
    //       </Link>
    //     </div>
    <div className="min-h-screen bg-sand-100 py-6 md:py-12 px-2 md:px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 md:mb-12">
        <Link to="/">
          <TOOBLogo width={100} height={40} className="mx-auto md:w-[150px] md:h-[60px]" />
        </Link>
      </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-500 mr-4" />
              <h2 className="text-3xl font-extrabold text-earth-900">Order Confirmed</h2>
            </div>
            <p className="text-xl text-center text-earth-700 mb-8">
              Thank you for your purchase! Your order has been successfully placed.
            </p>
            <div className="border-t border-earth-200 pt-6">
              <h3 className="text-lg font-medium text-earth-900 mb-4">Order Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-earth-500">Order Number</p>
                  <p className="mt-1 text-lg text-earth-900">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-earth-500">Date</p>
                  <p className="mt-1 text-lg text-earth-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-earth-500">Total Amount</p>
                  <p className="mt-1 text-lg text-earth-900">${order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-earth-500">Payment Status</p>
                  <p className="mt-1 text-lg text-green-600">Paid</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium text-earth-900 mb-4">Products</h3>
              <ul className="divide-y divide-earth-200">
                {order.products.map((item) => (
                  <li key={item.product._id} className="py-4 flex items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-earth-900">{item.product.name}</p>
                      <p className="mt-1 text-sm text-earth-500">
                        Quantity: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-earth-900">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center text-earth-700">
                <Truck className="h-6 w-6 mr-2" />
                <span>Estimated Delivery: 3-5 business days</span>
              </div>
              <div className="flex items-center text-earth-700">
                <Calendar className="h-6 w-6 mr-2" />
                <span>Track your order</span>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 bg-sand-50 sm:px-6">
            <div className="text-sm">
              <Link to="/" className="font-medium text-terracotta-600 hover:text-terracotta-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;