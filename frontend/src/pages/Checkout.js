import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../api/axios';
import TOOBLogo from '../components/TOOBLogo';
import { CreditCard, Lock, CheckCircle, ShieldCheck, Truck } from 'lucide-react';


import visaImage from '../images/visa.png';
import mastercardImage from '../images/mastercard.png';
import amexImage from '../images/amex.png';
import discoverImage from '../images/discover.png';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ clientSecret, amount, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: event.target.name.value,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        navigate(`/order-confirmation?orderId=${orderId}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="mb-6">
        <label htmlFor="name" className="block text-lg font-medium text-indigo-900 mb-2">Name on card</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border-2 border-indigo-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
        />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex items-center mb-4">
          <CreditCard className="w-6 h-6 text-indigo-600 mr-2" />
          <span className="text-lg font-medium text-indigo-900">Card Information</span>
        </div>
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-red-500 mb-4"
        >
          {error}
        </motion.div>
      )}
      {succeeded && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-green-500 mb-4 flex items-center"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Payment successful! Redirecting...
        </motion.div>
      )}
      <motion.button
        type="submit"
        disabled={!stripe || processing || succeeded}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-200 ease-in-out disabled:opacity-50 flex items-center justify-center"
      >
        {processing ? 'Processing...' : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Pay ${amount.toFixed(2)}
          </>
        )}
      </motion.button>
    </form>
  );
};




const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  const { cartItems } = useCart();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setAmount(total);
        const response = await axios.post('/payment/create-payment-intent', {
          amount: total,
          items: cartItems.map(item => ({
            _id: item._id,
            quantity: item.quantity,
            price: item.price
          }))
        });
        console.log('Payment intent response:', response.data);
        setClientSecret(response.data.clientSecret);
        setOrderId(response.data.orderId);
      } catch (error) {
        console.error('Error fetching payment intent:', error);
      }
    };
  
    if (cartItems.length > 0) {
      fetchPaymentIntent();
    }
  }, [cartItems]);

  const cardBrands = [
    { name: 'Visa', image: visaImage },
    { name: 'Mastercard', image: mastercardImage },
    { name: 'American Express', image: amexImage },
    { name: 'Discover', image: discoverImage },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-4 md:py-4 sticky top-0 z-50">
        <div className="container mx-auto px-2 md:px-2 ">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <TOOBLogo width={120} height={48} />
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
          Checkout
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">${amount.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Accepted Cards</h2>
              <div className="flex justify-around">
                {cardBrands.map((card) => (
                  <motion.img 
                    key={card.name}
                    src={card.image} 
                    alt={card.name} 
                    className="h-12"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          <div>
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Payment Details</h2>
              {clientSecret && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm clientSecret={clientSecret} amount={amount} orderId={orderId} />
                </Elements>
              )}
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="mt-12 bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Secure Checkout</h2>
          <div className="flex items-center mb-4">
            <ShieldCheck className="w-6 h-6 text-green-500 mr-2" />
            <span>Your payment information is encrypted and secure.</span>
          </div>
          <div className="flex items-center">
            <Truck className="w-6 h-6 text-indigo-600 mr-2" />
            <span>Free shipping on all orders over $100.</span>
          </div>
        </motion.div>
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

export default Checkout;

