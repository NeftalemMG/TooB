import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, User, ArrowLeft } from 'lucide-react';
import axios from '../api/axios';
import { isAuthenticated, getUser } from '../utils/auth';
import Button from '../components/ui/Button';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    if (isAuthenticated()) {
      setUser(getUser());
    }
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
      fetchCart();
    } catch (err) {
      setError('Failed to update quantity. Please try again.');
      console.error('Error updating quantity:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`);
      fetchCart();
    } catch (err) {
      setError('Failed to remove item. Please try again.');
      console.error('Error removing item:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-earth-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <header className="bg-earth-900 text-sand-100 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">TOOB</Link>
          {user && (
            <div className="flex items-center">
              <User size={20} className="mr-2" />
              <span>{user.name}</span>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/collections" className="text-earth-900 hover:text-terracotta-500 flex items-center">
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-earth-900 mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-earth-400 mb-4" />
            <h2 className="text-2xl font-bold text-earth-900 mb-4">Your cart is empty</h2>
            <p className="text-earth-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/collections"
              className="bg-terracotta-500 text-white px-6 py-3 rounded-full hover:bg-terracotta-600 transition-colors duration-300"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-earth-900">{item.name}</h3>
                    <p className="text-terracotta-500 font-bold">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded-full bg-earth-200 text-earth-600 hover:bg-earth-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-4 text-earth-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-1 rounded-full bg-earth-200 text-earth-600 hover:bg-earth-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-earth-900 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-earth-200 my-4"></div>
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>
                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-terracotta-500 text-white py-3 rounded-full hover:bg-terracotta-600 transition-colors duration-300"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
