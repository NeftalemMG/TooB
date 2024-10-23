import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, Minus, Plus, X, ChevronRight, Truck, Package } from 'lucide-react';
import TOOBLogo from '../components/TOOBLogo';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [cartItems]);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-4 sticky top-0 z-50"> */}
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-2 md:py-4 sticky top-0 z-50">

        {/* <div className="container mx-auto px-4"> */}
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex justify-between items-center">
            {/* <Link to="/" className="flex items-center">
              <TOOBLogo width={120} height={48} />
            </Link> */}
            <Link to="/" className="flex items-center">
              <TOOBLogo width={80} height={32} className="md:w-[120px] md:h-[48px]" />
            </Link>
            <nav className="hidden lg:flex space-x-8">
              {['Collections', 'Our Story', 'Atelier', 'Sustainability'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-800 hover:text-indigo-600 transition-colors duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-2 md:px-4 py-6 md:py-12">
          <motion.h1 
            className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-indigo-900"

          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Cart
        </motion.h1>
        <AnimatePresence>
          {!cartItems || cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <ShoppingBag className="w-24 h-24 mx-auto mb-4 text-indigo-300" />
              <p className="text-xl text-gray-600">Your cart is empty.</p>
              <Link to="/collections" className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300">
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-6 p-6 bg-white rounded-xl shadow-lg relative overflow-hidden"
                    >
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-6" />
                        <div>
                          <h2 className="text-xl font-semibold text-indigo-900">{item.name}</h2>
                          <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center mt-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors duration-300"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="mx-4 text-lg font-medium">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors duration-300"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item._id)}
                          className="ml-auto p-2 bg-red-100 rounded-full text-red-500 hover:bg-red-200 transition-colors duration-300"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <motion.div
                        className="absolute top-0 right-0 w-16 h-16 bg-indigo-200 rounded-bl-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-xl shadow-lg sticky top-24"
                  >
                    <h2 className="text-2xl font-bold text-indigo-900 mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div className="flex justify-between mb-4">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-xl font-bold">${total.toFixed(2)}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCheckout}
                      className="w-full px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                    >
                      Proceed to Checkout
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </motion.button>
                    <div className="mt-6 flex items-center justify-center text-gray-600">
                      <Truck className="w-5 h-5 mr-2" />
                      <span>Free shipping on all orders</span>
                    </div>
                  </motion.div>
                </div>
              </div>
              <motion.div 
                className="mt-12 p-6 bg-indigo-50 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">Delivery Information</h2>
                <div className="flex items-center mb-4">
                  <Package className="w-6 h-6 text-indigo-600 mr-2" />
                  <span>Your items will be carefully packaged to ensure safe delivery.</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-6 h-6 text-indigo-600 mr-2" />
                  <span>Expected delivery within 3-5 business days.</span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-indigo-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <TOOBLogo width={120} height={48} className="text-white" />
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2024 TOOB Habesha. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;