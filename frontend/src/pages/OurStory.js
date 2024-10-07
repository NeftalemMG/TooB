import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import Button from '../components/ui/Button';

const OurStory = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Our Story</h1>
          <Link to="/">
            <img src={require('../images/toobLogo.png')} alt="TOOB Logo" className="h-12" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src={require('../images/MKTNG 5.jpg')} alt="TOOB Heritage" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center">Bridging Heritage and Modernity</h2>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-4">Our Roots</h3>
              <p className="text-lg mb-4">
                TOOB was born from a passion for Habesha culture and a vision to bring its rich heritage to the modern fashion world. Our journey began in the heart of Ethiopia, where centuries-old craftsmanship meets contemporary design.
              </p>
              <p className="text-lg">
                Inspired by the intricate patterns of traditional Ethiopian textiles and the bold colors of the landscape, we set out to create a luxury brand that honors our ancestors while pushing the boundaries of modern fashion.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <img src={require('../images/HandmadeLeatherBags.png')} alt="Traditional Craftsmanship" className="rounded-lg shadow-lg" />
            </motion.div>
          </div>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="order-2 md:order-1"
            >
              <img src={require('../images/GreenGrayKimonoJacket.png')} alt="Modern Design" className="rounded-lg shadow-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="order-1 md:order-2"
            >
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg mb-4">
                At TOOB, we envision a world where cultural heritage and contemporary fashion coexist harmoniously. We strive to create pieces that not only look stunning but also tell a story - a story of tradition, innovation, and the beautiful complexity of our Ethiopian roots.
              </p>
              <p className="text-lg">
                Our commitment goes beyond fashion. We're dedicated to supporting local artisans, promoting sustainable practices, and showcasing the beauty of Habesha culture to the world.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-3xl font-bold mb-4">Join Our Journey</h3>
          <p className="text-lg mb-6">
            Every TOOB piece is more than just clothing - it's a celebration of culture, a nod to history, and a step towards the future of fashion. We invite you to be part of our story.
          </p>
          <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
            Explore Our Collections
          </Button>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TOOB Luxury. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OurStory;