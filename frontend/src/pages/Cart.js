import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import axios from '../api/axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/cart');
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart. Please try again.');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(`/cart/${productId}`, { quantity: newQuantity });
      fetchCart(); // Refetch cart after update
    } catch (err) {
      setError('Failed to update quantity. Please try again.');
      console.error('Error updating quantity:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`);
      fetchCart(); // Refetch cart after removal
    } catch (err) {
      setError('Failed to remove item. Please try again.');
      console.error('Error removing item:', err);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-sand-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-earth-900"></div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-sand-50">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    </div>;
  }

  if (cart.length === 0) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-sand-50">
      <ShoppingBag className="w-24 h-24 text-earth-400 mb-4" />
      <h2 className="text-2xl font-bold text-earth-900 mb-4">Your cart is empty</h2>
      <p className="text-earth-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
      <Link
        to="/collections"
        className="bg-terracotta-500 text-white px-6 py-3 rounded-full hover:bg-terracotta-600 transition-colors duration-300"
      >
        Continue Shopping
      </Link>
    </div>;
  }

  return (
    <div className="min-h-screen bg-sand-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-earth-900 mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center py-6 border-b border-earth-200 last:border-b-0">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-earth-900">{item.name}</h3>
                <p className="text-earth-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                  className="p-2 rounded-full bg-earth-200 text-earth-600 hover:bg-earth-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="mx-4 text-earth-900">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-2 rounded-full bg-earth-200 text-earth-600 hover:bg-earth-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="ml-6 p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-earth-900">Total:</span>
            <span className="text-2xl font-bold text-terracotta-600">
              ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-terracotta-500 text-white py-3 rounded-full hover:bg-terracotta-600 transition-colors duration-300 text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
