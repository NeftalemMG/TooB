import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (product) => {
    try {
      const existingItem = cartItems.find(item => item._id === product._id);
      if (existingItem) {
        setCartItems(prevItems => prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
      }
      setError(null);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setError('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
      setError(null);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity === 0) {
        removeFromCart(productId);
      } else {
        setCartItems(prevItems => prevItems.map(item =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        ));
      }
      setError(null);
    } catch (error) {
      console.error('Error updating item quantity:', error);
      setError('Failed to update item quantity');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, error, setError }}>
      {children}
    </CartContext.Provider>
  );
};