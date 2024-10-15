import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import axios from '../api/axios';
import { ShoppingBag, CreditCard, Truck, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/cart');
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Failed to load cart items. Please try again.');
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/payment', { state: { address, cartItems } });
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
    <div className="min-h-screen bg-sand-50 text-earth-900">
      <header className="bg-earth-900 text-sand-100 py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold">TOOB</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/cart" className="text-earth-900 hover:text-terracotta-500 flex items-center">
            <ArrowLeft size={20} className="mr-2" />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ShoppingBag className="mr-2" />
              Order Summary
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center mb-4 pb-4 border-b border-earth-200 last:border-b-0 last:pb-0 last:mb-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-earth-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="mt-4 text-xl font-semibold flex justify-between">
                <span>Total:</span>
                <span>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Truck className="mr-2" />
              Shipping Address
            </h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <label htmlFor="street" className="block mb-2 font-medium">Street Address</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  required
                  className="w-full p-2 border border-earth-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block mb-2 font-medium">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    required
                    className="w-full p-2 border border-earth-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block mb-2 font-medium">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                    className="w-full p-2 border border-earth-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="zipCode" className="block mb-2 font-medium">Zip Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleAddressChange}
                        required
                        className="w-full p-2 border border-earth-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block mb-2 font-medium">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={address.country}
                        onChange={handleAddressChange}
                        required
                        className="w-full p-2 border border-earth-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-terracotta-500 text-white py-3 rounded-full hover:bg-terracotta-600 transition-colors duration-300 flex items-center justify-center"
                  >
                    <CreditCard className="mr-2" />
                    Proceed to Payment
                  </Button>
                </form>
              </motion.div>
            </div>
          </main>
        </div>
      );
    };
    
    export default Checkout;