import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    console.log('Initial cart from localStorage:', savedCart); // Debug log
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    console.log('Cart updated, saving to localStorage:', cartItems); // Debug log
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (product) => {
    console.log('Adding to cart:', product); // Debug log
    try {
      const existingItem = cartItems.find(item => item._id === product._id);
      if (existingItem) {
        setCartItems(prevItems => prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
      }
      console.log('Cart after adding:', cartItems); // Debug log
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    console.log('Removing from cart:', productId); // Debug log
    try {
      setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    console.log('Updating quantity:', productId, newQuantity); // Debug log
    try {
      if (newQuantity === 0) {
        removeFromCart(productId);
      } else {
        setCartItems(prevItems => prevItems.map(item =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        ));
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  console.log('Current cart state:', cartItems); // Debug log

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};