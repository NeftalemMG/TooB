import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send} from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import Alert from '@/components/ui/alert/Alert';
// import AlertDescription from '@/components/ui/alert/AlertDescription';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-600 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Stay in touch with Habesha Chic
        </h2>
        <p className="mt-4 text-lg text-indigo-100">
          Subscribe to our newsletter for exclusive deals, styling tips, and cultural insights.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
          <motion.input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-5 py-3 border-2 border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white focus:border-white sm:max-w-xs rounded-full text-gray-900"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            type="submit"
            className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
            <Send className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </motion.button>
        </form>
      </div>
      {isSubscribed && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          {/* <Alert className="mt-4 max-w-md mx-auto bg-white text-indigo-600">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Thank you for subscribing to our newsletter!
            </AlertDescription>
          </Alert> */}
        </motion.div>
      )}
    </section>
  );
};

export default Newsletter;
