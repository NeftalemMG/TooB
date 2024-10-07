import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import Button from '../components/ui/Button';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Ethereal Blue Coat', price: 2999.99, quantity: 1, image: require('../images/blueCoat.jpg') },
    { id: 2, name: 'Timeless Brown Shirt', price: 899.99, quantity: 2, image: require('../images/brownShirt.jpg') },
    { id: 3, name: 'Emerald Dream Dress', price: 4999.99, quantity: 1, image: require('../images/NexelaDress.jpg') },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Link to="/">
            <img src={require('../images/toobLogo.png')} alt="TOOB Logo" className="h-12" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/collections">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, -1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2 font-bold">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" className="ml-4" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </motion.div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Total</h3>
                <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>
              <Button size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TOOB Luxury. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;