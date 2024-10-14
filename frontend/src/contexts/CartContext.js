import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/cart');
      setCart(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart. Please try again.');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const { data } = await axios.post('/cart', { productId: product._id });
      setCart(data);
      setError(null);
    } catch (err) {
      setError('Failed to add item to cart. Please try again.');
      console.error('Error adding to cart:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await axios.delete('/cart', { data: { productId } });
      setCart(data);
      setError(null);
    } catch (err) {
      setError('Failed to remove item from cart. Please try again.');
      console.error('Error removing from cart:', err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await axios.put(`/cart/${productId}`, { quantity });
      setCart(data);
      setError(null);
    } catch (err) {
      setError('Failed to update item quantity. Please try again.');
      console.error('Error updating quantity:', err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/cart');
      setCart([]);
      setError(null);
    } catch (err) {
      setError('Failed to clear cart. Please try again.');
      console.error('Error clearing cart:', err);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart, 
      loading, 
      error 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};