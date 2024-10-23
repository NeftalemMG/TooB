import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import TOOBLogo from '../components/TOOBLogo';

const Logout = () => {
  // Particle animation setup
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto scroll to showcase the background animation
      window.scrollTo({ top: 50, behavior: 'smooth' });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Animated background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-30"
          animate={{
            x: [
              `${particle.x}vw`,
              `${particle.x + Math.random() * 20 - 10}vw`,
              `${particle.x}vw`
            ],
            y: [
              `${particle.y}vh`,
              `${particle.y + Math.random() * 20 - 10}vh`,
              `${particle.y}vh`
            ],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: particle.size,
            height: particle.size
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <Link to="/">
            <TOOBLogo width={120} height={48} className="mx-auto mb-8" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 max-w-2xl w-full text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center"
          >
            <ShoppingBag className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1 
            className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Thanks for Shopping with Us!
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            You've been successfully logged out. We hope to see you again soon!
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="bg-indigo-50 rounded-2xl p-4">
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Save your favorites for next time</p>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-4">
              <ShoppingBag className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Track your orders anytime</p>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-4">
              <Instagram className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Follow us for updates</p>
            </div>
          </motion.div>

          <motion.div
            className="space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
            >
              Return Home
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors duration-300"
            >
              Sign In Again
            </Link>
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex space-x-6"
        >
          {[
            { Icon: Facebook, color: 'text-blue-600' },
            { Icon: Twitter, color: 'text-sky-500' },
            { Icon: Instagram, color: 'text-pink-600' }
          ].map(({ Icon, color }, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`${color} hover:opacity-80 transition-opacity duration-300`}
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Circular animated decoration */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-indigo-300 opacity-20"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.2, 0.1, 0.2],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                delay: i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-48 h-48 sm:w-64 sm:h-64" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logout;