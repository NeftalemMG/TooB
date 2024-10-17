// 

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Shirt, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import TOOBLogo from '../components/TOOBLogo';

// Import images
import heritageBgImage from '../images/MKTNG 5.jpg';
import traditionalCraftsmanshipImage from '../images/HandmadeLeatherBags.png';
import modernDesignImage from '../images/GreenGrayKimonoJacket.png';

const OurStory = () => {
  const controls = useAnimation();

  const scrollAnimation = async () => {
    await controls.start({ y: [0, -10, 0], transition: { duration: 1, repeat: Infinity } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900">
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
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

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12 relative">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
            <img src={heritageBgImage} alt="TOOB Heritage" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center">Bridging Heritage and Modernity</h2>
            </div>
          </div>
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            animate={controls}
            onViewportEnter={scrollAnimation}
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-indigo-900">Our Roots</h3>
              <p className="text-lg mb-4 text-gray-700">
                TOOB was born from a passion for Habesha culture and a vision to bring its rich heritage to the modern fashion world. Our journey began in the heart of Ethiopia, where centuries-old craftsmanship meets contemporary design.
              </p>
              <p className="text-lg text-gray-700">
                Inspired by the intricate patterns of traditional Ethiopian textiles and the bold colors of the landscape, we set out to create a luxury brand that honors our ancestors while pushing the boundaries of modern fashion.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <img src={traditionalCraftsmanshipImage} alt="Traditional Craftsmanship" className="rounded-3xl shadow-lg" />
              <motion.div
                className="absolute -top-8 -left-8 w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {/* <Thread className="w-full h-full text-indigo-500" /> */}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="order-2 md:order-1 relative"
            >
              <img src={modernDesignImage} alt="Modern Design" className="rounded-3xl shadow-lg" />
              <motion.div
                className="absolute -bottom-8 -right-8 w-16 h-16"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shirt className="w-full h-full text-pink-500" />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="order-1 md:order-2"
            >
              <h3 className="text-3xl font-bold mb-4 text-indigo-900">Our Vision</h3>
              <p className="text-lg mb-4 text-gray-700">
                At TOOB, we envision a world where cultural heritage and contemporary fashion coexist harmoniously. We strive to create pieces that not only look stunning but also tell a story - a story of tradition, innovation, and the beautiful complexity of our Ethiopian roots.
              </p>
              <p className="text-lg text-gray-700">
                Our commitment goes beyond fashion. We're dedicated to supporting local artisans, promoting sustainable practices, and showcasing the beauty of Habesha culture to the world.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="text-center relative">
          {/* <motion.div
            className="absolute -top-12 left-1/4 w-16 h-16"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Scissors className="w-full h-full text-indigo-500" />
          </motion.div> */}
          <h3 className="text-3xl font-bold mb-4 text-indigo-900">Join Our Journey</h3>
          <p className="text-lg mb-6 text-gray-700">
            Every TOOB piece is more than just clothing - it's a celebration of culture, a nod to history, and a step towards the future of fashion. We invite you to be part of our story.
          </p>
          <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 rounded-full px-8 py-3 text-lg shadow-lg transform hover:scale-105">
            Explore Our Collections
          </Button>
        </section>
      </main>

      <footer className="bg-indigo-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <TOOBLogo width={120} height={48} className="text-white" />
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2024 TOOB Luxury. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OurStory;