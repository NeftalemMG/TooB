import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import axios from '../api/axios';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Here you would integrate with your payment gateway
      // For this example, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 text-earth-900">
      <header className="bg-earth-900 text-sand-100 py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold">TOOB</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/checkout" className="text-earth-900 hover:text-terracotta-500 flex items-center">
            <ArrowLeft size={20} className="mr-2" />
            Back to Checkout
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Payment</h1>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2" />
              Payment Details
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Payment Method</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 rounded-md ${paymentMethod === 'card' ? 'bg-terracotta-500 text-white' : 'bg-earth-200 text-earth-700'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 rounded-md ${paymentMethod === 'paypal' ? 'bg-terracotta-500 text-white' : 'bg-earth-200 text-earth-700'}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    PayPal
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block mb-2 font-medium">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-2 border border-earth-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="expiry" className="block mb-2 font-medium">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        placeholder="MM/YY"
                        className="w-full p-2 border border-earth-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block mb-2 font-medium">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        className="w-full p-2 border border-earth-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'paypal' && (
                <div className="mb-4">
                  <p className="text-earth-600">You will be redirected to PayPal to complete your payment.</p>
                </div>
              )}

              {error && (
                <div className="mb-4 text-red-500">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-terracotta-500 text-white py-3 rounded-full hover:bg-terracotta-600 transition-colors duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Lock className="mr-2" />
                    Complete Payment
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Payment;